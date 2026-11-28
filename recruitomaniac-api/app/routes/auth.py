from typing import Annotated

from fastapi import APIRouter, Depends

from app.security import CurrentUser, get_current_user

# A router is a group of related routes.
# `prefix` is added to the start of every path here, so "/me" becomes "/auth/me".
# `tags` groups these routes under "auth" on the /docs page.
#
# Signing up and logging in happen in the web app, directly with Supabase.
# The API only checks the token Supabase gives the user (see app/security.py).
router = APIRouter(prefix="/auth", tags=["auth"])


# GET /auth/me returns the logged-in user.
# `Depends(get_current_user)` runs the login check first. If it fails, this
# function never runs and the caller gets a 401 error instead.
@router.get("/me")
def read_current_user(
    user: Annotated[CurrentUser, Depends(get_current_user)],
) -> CurrentUser:
    return user
