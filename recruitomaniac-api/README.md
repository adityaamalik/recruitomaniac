# Recruitomaniac API

The backend for Recruitomaniac, built with [FastAPI](https://fastapi.tiangolo.com/).

## Requirements

[uv](https://docs.astral.sh/uv/), which manages Python and the packages for this project.

## Run the server

From inside the `recruitomaniac-api` folder:

```bash
uv sync                      # install the packages (needed the first time)
uv run fastapi dev main.py   # start the server
```

Then open:

- http://127.0.0.1:8000 shows the welcome message
- http://127.0.0.1:8000/docs shows the interactive API docs, generated automatically

The server restarts by itself when you save a file. Press `Ctrl + C` to stop it.

## Check your code

Run these before opening a pull request. CI runs the same ones on GitHub.

```bash
uv run ruff check .      # find likely mistakes
uv run ruff format .     # tidy the formatting
uv run pytest            # run the tests
```

## Files

| File              | What it is for                                              |
| ----------------- | ----------------------------------------------------------- |
| `main.py`         | The server and its routes                                   |
| `tests/`          | Automatic tests, run with pytest                            |
| `pyproject.toml`  | Project details and the packages it needs                   |
| `uv.lock`         | Exact package versions. uv updates it, so don't edit it     |
| `.python-version` | The Python version uv uses                                  |
| `.gitignore`      | Files that git should not save                              |

## Add a package

```bash
uv add package-name
```
