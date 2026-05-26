from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.session import SessionLocal

from app.models.budget import Budget
from app.models.user import User

from app.schemas.budget_schema import (
    BudgetCreate
)

from app.auth.dependencies import (
    get_current_user
)

router = APIRouter()

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE BUDGET
@router.post("/")
def create_budget(
    budget: BudgetCreate,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    existing_budget = db.query(Budget).filter(
        Budget.user_id == user.id,
        Budget.category == budget.category
    ).first()

    if existing_budget:

        existing_budget.limit_amount = (
            budget.limit_amount
        )

        db.commit()

        return {
            "message": "Budget updated"
        }

    new_budget = Budget(
        user_id=user.id,
        category=budget.category,
        limit_amount=budget.limit_amount
    )

    db.add(new_budget)

    db.commit()

    return {
        "message": "Budget created"
    }

# GET BUDGETS
@router.get("/")
def get_budgets(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    budgets = db.query(Budget).filter(
        Budget.user_id == user.id
    ).all()

    return budgets