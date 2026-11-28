from fastapi import APIRouter

# Routes used by recruiters, such as managing jobs and candidates.
# Every path here starts with "/recruiter".
router = APIRouter(prefix="/recruiter", tags=["recruiter"])


# GET /recruiter/jobs lists the company's jobs.
@router.get("/jobs")
def list_jobs() -> list[dict]:
    # There is no database yet (issue #4), so there are no jobs to return.
    return []
