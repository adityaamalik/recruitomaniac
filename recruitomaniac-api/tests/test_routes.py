from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_auth_me_is_not_ready_yet():
    response = client.get("/auth/me")

    assert response.status_code == 501
    assert response.json() == {"detail": "Authentication is not set up yet."}


def test_recruiter_jobs_starts_empty():
    response = client.get("/recruiter/jobs")

    assert response.status_code == 200
    assert response.json() == []
