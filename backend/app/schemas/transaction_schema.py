from pydantic import BaseModel
from datetime import date

class TransactionCreate(BaseModel):
    amount: float
    type: str
    category: str
    description: str
    date: date

class TransactionResponse(BaseModel):
    id: int
    amount: float
    type: str
    category: str
    description: str
    date: date

    class Config:
        orm_mode = True