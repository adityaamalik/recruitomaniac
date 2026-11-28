from fastapi import APIRouter, Depends

from app.security import get_current_user

# Routes used by recruiters, such as managing jobs and candidates.
# Every path here starts with "/recruiter".
#
# `dependencies=[...]` runs the login check before EVERY route in this file,
# so none of them can be used without logging in.
router = APIRouter(
    prefix="/recruiter",
    tags=["recruiter"],
    dependencies=[Depends(get_current_user)],
)


# GET /recruiter/jobs lists the company's jobs.
@router.get("/jobs")
def list_jobs() -> list[dict]:
    # There is no database yet (issue #4), so there are no jobs to return.
    return []
