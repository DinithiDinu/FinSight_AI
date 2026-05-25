from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.session import SessionLocal

from app.models.transaction import Transaction
from app.models.user import User

from app.schemas.transaction_schema import (
    TransactionCreate
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

# CREATE TRANSACTION
@router.post("/")
def create_transaction(
    transaction: TransactionCreate,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    new_transaction = Transaction(
        user_id=user.id,
        amount=transaction.amount,
        type=transaction.type,
        category=transaction.category,
        description=transaction.description,
        date=transaction.date
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)

    return {
        "message": "Transaction created"
    }

# GET USER TRANSACTIONS
@router.get("/")
def get_transactions(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    transactions = db.query(Transaction).filter(
        Transaction.user_id == user.id
    ).all()

    return transactions