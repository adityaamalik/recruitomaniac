from fastapi.testclient import TestClient

from main import app

# TestClient sends requests to our app without starting a real server.
client = TestClient(app)


# pytest runs every function whose name starts with "test_".
def test_home_returns_welcome_message():
    response = client.get("/")

    # `assert` fails the test if the condition is not true.
    assert response.status_code == 200
    assert response.json() == "Welcome to recruitomaniac APIs"
