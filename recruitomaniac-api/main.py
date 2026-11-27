from fastapi import FastAPI

# `app` is our server. Every URL (route) we create is attached to it.
app = FastAPI(title="Recruitomaniac API")


# This runs when someone sends a GET request to "/".
@app.get("/")
def home() -> str:
    message = "Welcome to recruitomaniac APIs"
    return message  # sent back to the browser
