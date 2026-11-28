import time

import jwt
from cryptography.hazmat.primitives.asymmetric import ec
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_me_returns_the_logged_in_user(auth_header):
    response = client.get("/auth/me", headers=auth_header)

    assert response.status_code == 200
    assert response.json() == {"id": "user-123", "email": "recruiter@example.com"}


def test_me_without_a_token_is_rejected():
    response = client.get("/auth/me")

    assert response.status_code == 401
    assert response.json() == {"detail": "You need to log in."}


def test_text_that_is_not_a_token_is_rejected():
    response = client.get("/auth/me", headers={"Authorization": "Bearer hello"})

    assert response.status_code == 401


def test_expired_token_is_rejected(make_token):
    an_hour_ago = int(time.time()) - 3600
    token = make_token(exp=an_hour_ago)

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401


def test_token_from_another_supabase_project_is_rejected(make_token):
    token = make_token(iss="https://another-project.supabase.co/auth/v1")

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401


def test_token_not_for_logged_in_users_is_rejected(make_token):
    token = make_token(aud="anon")

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401


def test_token_without_an_expiry_time_is_rejected(make_token):
    token = make_token(exp=None)

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401


def test_token_signed_with_someone_elses_key_is_rejected(make_token):
    # An attacker's key, claiming to be Supabase's key ID.
    attacker_key = ec.generate_private_key(ec.SECP256R1())
    token = make_token(key=attacker_key)

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401


def test_token_with_an_unknown_key_id_is_rejected(make_token):
    token = make_token(key_id="unknown-key")

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401


def test_changed_token_is_rejected(make_token):
    # Try to change the user ID inside a real token without re-signing it.
    header, _payload, signature = make_token().split(".")
    forged_payload = jwt.utils.base64url_encode(
        b'{"sub":"admin","aud":"authenticated","exp":9999999999}'
    ).decode()
    token = f"{header}.{forged_payload}.{signature}"

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401


def test_supabase_being_unreachable_returns_503(
    fake_supabase_keys, monkeypatch, auth_header
):
    def supabase_is_down():
        raise jwt.PyJWKClientConnectionError("Could not connect")

    monkeypatch.setattr(fake_supabase_keys, "fetch_data", supabase_is_down)

    response = client.get("/auth/me", headers=auth_header)

    assert response.status_code == 503
