from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.session import SessionLocal

from app.models.transaction import Transaction
from app.models.user import User

from app.auth.dependencies import (
    get_current_user
)

from app.services.anomaly_detection import (
    detect_anomalies
)

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get("/")
def get_anomalies(
    current_user: str = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    transactions = db.query(
        Transaction
    ).filter(
        Transaction.user_id == user.id
    ).all()

    anomalies = detect_anomalies(
        transactions
    )

    return anomalies