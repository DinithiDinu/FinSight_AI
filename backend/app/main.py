from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import (
    router as auth_router
)

from app.routes.transaction_routes import (
    router as transaction_router
)

from app.routes.budget_routes import (
    router as budget_router
)

from app.routes.ml_routes import (
    router as ml_router
)

app = FastAPI()

# ALLOW FRONTEND
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
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

app.include_router(
    budget_router,
    prefix="/budgets",
    tags=["Budgets"]
)

app.include_router(
    ml_router,
    prefix="/ml",
    tags=["Machine Learning"]
)

@app.get("/")
def root():
    return {
        "message": "FinSight AI Backend Running"
    }