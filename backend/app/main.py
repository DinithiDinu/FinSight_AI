from fastapi import FastAPI

from app.routes.auth_routes import (
    router as auth_router
)

from app.routes.transaction_routes import (
    router as transaction_router
)

app = FastAPI()

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    transaction_router,
    prefix="/transactions",
    tags=["Transactions"]
)

@app.get("/")
def root():
    return {
        "message": "FinSight AI Backend Running"
    }