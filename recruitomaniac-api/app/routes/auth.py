from fastapi import APIRouter, HTTPException

# A router is a group of related routes.
# `prefix` is added to the start of every path here, so "/me" becomes "/auth/me".
# `tags` groups these routes under "auth" on the /docs page.
router = APIRouter(prefix="/auth", tags=["auth"])


# GET /auth/me will return the logged-in user.
@router.get("/me")
def get_current_user():
    # 501 means "Not Implemented". Login is added in issue #5.
    raise HTTPException(status_code=501, detail="Authentication is not set up yet.")
