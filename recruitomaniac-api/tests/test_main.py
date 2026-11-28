from fastapi.testclient import TestClient

from app.main import app, web_app_url

# TestClient sends requests to our app without starting a real server.
client = TestClient(app)


# pytest runs every function whose name starts with "test_".
def test_home_returns_welcome_message():
    response = client.get("/")

    # `assert` fails the test if the condition is not true.
    assert response.status_code == 200
    assert response.json() == "Welcome to recruitomaniac APIs"


def test_web_app_is_allowed_to_call_the_api():
    # Before some requests, browsers ask the API for permission (a "preflight" OPTIONS request).
    response = client.options(
        "/",
        headers={
            "Origin": web_app_url,
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == web_app_url


def test_other_websites_are_not_allowed():
    response = client.get("/", headers={"Origin": "https://some-other-site.com"})

    # Without this header, the browser hides the response from the other website.
    assert "access-control-allow-origin" not in response.headers
