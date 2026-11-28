"""Shared test setup. pytest loads this file automatically, before any test file.

The tests never contact the real Supabase. Instead, we make our own signing key,
pretend it is Supabase's, and sign test tokens with it.
"""

import os
import time

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import ec
from jwt.algorithms import ECAlgorithm

# Settings are read when the app is imported, so set them before any test imports it.
# A real environment variable wins over your .env file, so tests always use this.
os.environ["SUPABASE_URL"] = "https://test-project.supabase.co"

# This import must come after setting SUPABASE_URL above.
from app import security

TEST_ISSUER = "https://test-project.supabase.co/auth/v1"
TEST_KEY_ID = "test-key"

# A private key, like the one Supabase keeps secret, and its public half as a JWK
# (the format Supabase publishes its public keys in).
private_key = ec.generate_private_key(ec.SECP256R1())
public_jwk = ECAlgorithm.to_jwk(private_key.public_key(), as_dict=True) | {
    "kid": TEST_KEY_ID,
    "alg": "ES256",
    "use": "sig",
}


@pytest.fixture(autouse=True)  # autouse: every test gets this automatically
def fake_supabase_keys(monkeypatch):
    """Make the API download our test public key instead of Supabase's."""
    # A fresh client for each test, so no keys are remembered between tests.
    client = jwt.PyJWKClient(f"{TEST_ISSUER}/.well-known/jwks.json")
    monkeypatch.setattr(client, "fetch_data", lambda: {"keys": [public_jwk]})
    monkeypatch.setattr(security, "jwks_client", client)
    return client


@pytest.fixture
def make_token():
    """Create a test token that looks like one from Supabase.

    Pass a field to change it, e.g. make_token(aud="someone-else"),
    or set it to None to leave it out, e.g. make_token(exp=None).
    """

    def _make_token(key=private_key, key_id=TEST_KEY_ID, **changes):
        now = int(time.time())
        claims = {
            "sub": "user-123",
            "email": "recruiter@example.com",
            "aud": "authenticated",
            "role": "authenticated",
            "iss": TEST_ISSUER,
            "iat": now,
            "exp": now + 3600,  # valid for one hour
        }
        claims.update(changes)
        claims = {name: value for name, value in claims.items() if value is not None}
        return jwt.encode(claims, key, algorithm="ES256", headers={"kid": key_id})

    return _make_token


@pytest.fixture
def auth_header(make_token):
    """Headers with a valid token, for calling routes that need a login."""
    return {"Authorization": f"Bearer {make_token()}"}
