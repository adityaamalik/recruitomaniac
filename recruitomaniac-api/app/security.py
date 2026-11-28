"""Checks who is calling the API.

Users log in through Supabase in the web app. Supabase then gives the browser an
"access token" (a JWT), and the web app sends it with every request in this header:

    Authorization: Bearer <access token>

This file checks that token. The API never sees anyone's password.
"""

from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

from app.config import settings

# Supabase Auth's address, e.g. "https://abcdefghijklmnop.supabase.co/auth/v1".
# Tokens from our project say this in their "iss" (issuer) field.
SUPABASE_AUTH_URL = settings.supabase_url.rstrip("/") + "/auth/v1"

# Supabase signs every token with a private key that only Supabase has, and
# publishes the matching public keys at this address (a "JWKS"). With a public key
# we can check that a token really came from Supabase and hasn't been changed.
# The keys are downloaded the first time they're needed and reused for
# 5 minutes (lifespan=300), so most requests don't need to contact Supabase.
jwks_client = jwt.PyJWKClient(
    f"{SUPABASE_AUTH_URL}/.well-known/jwks.json",
    lifespan=300,
    timeout=5,  # seconds to wait for Supabase before giving up
)

# Reads the "Authorization: Bearer ..." header. It also adds an "Authorize"
# button to the /docs page, where you can paste a token to try protected routes.
# auto_error=False lets us send our own error message when the header is missing.
bearer_scheme = HTTPBearer(auto_error=False)


class CurrentUser(BaseModel):
    """The logged-in user, taken from their token."""

    id: str  # Supabase's user ID (the token's "sub" field)
    email: str | None = None


def verify_token(token: str) -> dict:
    """Check a Supabase access token and return the data inside it (its "claims").

    Raises a `jwt.PyJWTError` if the token is fake, changed, expired or not for us.
    """
    # Each token says which key signed it (its "kid"). Find that public key.
    signing_key = jwks_client.get_signing_key_from_jwt(token)

    return jwt.decode(
        token,
        signing_key,
        algorithms=["ES256", "RS256"],  # the signing methods Supabase uses
        audience="authenticated",  # tokens for logged-in users
        issuer=SUPABASE_AUTH_URL,  # issued by our Supabase project, not someone else's
        options={"require": ["exp", "sub"]},  # must have an expiry time and a user ID
    )


def unauthorized(message: str) -> HTTPException:
    """A 401 error, which tells the web app the user needs to log in."""
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=message,
        # The standard way to tell the caller "send a Bearer token".
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
) -> CurrentUser:
    """Return the logged-in user, or stop the request with an error.

    Use it in a route to require a login:

        def my_route(user: Annotated[CurrentUser, Depends(get_current_user)]):
    """
    if credentials is None:
        raise unauthorized("You need to log in.")

    try:
        claims = verify_token(credentials.credentials)
    except jwt.PyJWKClientConnectionError:
        # Supabase could not be reached, so we can't tell if the token is real.
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not reach Supabase to check your login. Please try again.",
        )
    except jwt.PyJWTError:
        raise unauthorized("Your login is invalid or has expired. Please log in again.")

    return CurrentUser(id=claims["sub"], email=claims.get("email"))
