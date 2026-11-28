# Recruitomaniac API

The backend for Recruitomaniac, built with [FastAPI](https://fastapi.tiangolo.com/).

## Requirements

[uv](https://docs.astral.sh/uv/), which manages Python and the packages for this project.

## Run the server

From inside the `recruitomaniac-api` folder:

```bash
cp -n .env.example .env   # create your settings file (first time only), then fill it in
uv sync                   # install the packages (first time, and after packages change)
uv run fastapi dev        # start the server (it finds app/main.py by itself)
```

Then open:

- http://127.0.0.1:8000 shows the welcome message
- http://127.0.0.1:8000/docs shows the interactive API docs, generated automatically

The server restarts by itself when you save a file. Press `Ctrl + C` to stop it.

`SUPABASE_URL` must be set in `.env`, or the server stops with `supabase_url Field required`.

## Logins

Users sign up and log in through [Supabase Auth](https://supabase.com/docs/guides/auth) in the web app.
The web app then sends the user's access token with each request:

```
Authorization: Bearer <access token>
```

[`app/security.py`](app/security.py) checks the token with Supabase's public keys.
To require a login:

- **For one route**, add a `user` parameter:
  ```python
  def my_route(user: Annotated[CurrentUser, Depends(get_current_user)]):
  ```
- **For every route in a file**, add `dependencies=[Depends(get_current_user)]` to its `APIRouter(...)`.

To try a protected route, copy a user's access token. Then click **Authorize** on the `/docs` page and paste it in.

## Check your code

Run these before opening a pull request. CI runs the same ones on GitHub.

```bash
uv run ruff check .      # find likely mistakes
uv run ruff format .     # tidy the formatting
uv run pytest            # run the tests
```

## Files

| File                  | What it is for                                                  |
| --------------------- | --------------------------------------------------------------- |
| `app/main.py`         | Creates the server, allows the web app (CORS), adds the routes  |
| `app/config.py`       | Reads settings from `.env`                                      |
| `app/security.py`     | Checks the Supabase login token sent with each request          |
| `app/routes/`         | One file per group of routes, such as `auth.py`                 |
| `tests/`              | Automatic tests, run with pytest                                |
| `tests/conftest.py`   | Shared test setup, including fake Supabase keys and test tokens |
| `.env.example`        | The settings the API needs. Copy it to `.env`                   |
| `pyproject.toml`      | Project details and the packages it needs                       |
| `uv.lock`             | Exact package versions. uv updates it, so don't edit it         |
| `.python-version`     | The Python version uv uses                                      |
| `.gitignore`          | Files that git should not save                                  |

## Add a package

```bash
uv add package-name
```

## Add a new group of routes

1. Create `app/routes/<name>.py` with `router = APIRouter(prefix="/<name>", tags=["<name>"])`.
2. Add routes to it with `@router.get(...)`, `@router.post(...)` and so on.
3. In `app/main.py`, import it and add `app.include_router(<name>.router)`.
