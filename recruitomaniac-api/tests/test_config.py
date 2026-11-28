from app.config import Settings


def test_default_values_are_used_when_nothing_is_set(monkeypatch):
    # monkeypatch changes environment variables for this test only.
    monkeypatch.delenv("FRONTEND_URL", raising=False)

    settings = Settings(_env_file=None)  # ignore your real .env file in this test

    assert settings.frontend_url == "http://localhost:3000"
    assert settings.database_url is None


def test_environment_variables_are_read(monkeypatch):
    monkeypatch.setenv("FRONTEND_URL", "https://recruitomaniac.example")

    settings = Settings(_env_file=None)

    assert settings.frontend_url == "https://recruitomaniac.example"
