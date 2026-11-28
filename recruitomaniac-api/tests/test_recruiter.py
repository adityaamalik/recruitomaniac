from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_jobs_need_a_login():
    response = client.get("/recruiter/jobs")

    assert response.status_code == 401


def test_jobs_start_empty_for_a_logged_in_user(auth_header):
    response = client.get("/recruiter/jobs", headers=auth_header)

    assert response.status_code == 200
    assert response.json() == []
