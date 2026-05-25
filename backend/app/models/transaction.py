from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    Date
)

from app.database.base import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    amount = Column(Float)

    type = Column(String)

    category = Column(String)

    description = Column(String)

    date = Column(Date)