from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import auth, recruiter

# `app` is our server. Every URL (route) we create is attached to it.
app = FastAPI(title="Recruitomaniac API")

# The web app's address, e.g. "http://localhost:3000".
# A "/" at the end would stop it matching the address the browser sends, so remove it.
web_app_url = settings.frontend_url.rstrip("/")

# CORS: browsers block a website from calling an API on a different address
# unless the API allows it. This allows our web app, and nothing else.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[web_app_url],
    allow_credentials=True,  # allow login cookies and tokens to be sent
    allow_methods=["*"],  # GET, POST, PUT, DELETE, ...
    allow_headers=["*"],
)

# Add the routes from each file in app/routes/.
app.include_router(auth.router)
app.include_router(recruiter.router)


# This runs when someone sends a GET request to "/".
@app.get("/")
def home() -> str:
    message = "Welcome to recruitomaniac APIs"
    return message  # sent back to the browser
