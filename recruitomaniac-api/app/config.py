from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# The .env file sits in the recruitomaniac-api folder, one level above this file.
ENV_FILE = Path(__file__).parent.parent / ".env"


class Settings(BaseSettings):
    """All the settings the API needs, read from environment variables or .env.

    Each field matches a variable name, ignoring case:
    `frontend_url` is read from `FRONTEND_URL`.
    If a variable is missing, the default value after `=` is used.
    """

    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        extra="ignore",  # don't fail on variables in .env that aren't listed here
    )

    # Address of the web app. Only this site is allowed to call the API from a browser.
    frontend_url: str = "http://localhost:3000"

    # PostgreSQL connection. Not used yet: it will be needed from issue #4.
    database_url: str | None = None


# Create the settings once. Other files import this object:
#   from app.config import settings
settings = Settings()
