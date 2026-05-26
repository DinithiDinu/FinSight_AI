from pydantic import BaseModel

class BudgetCreate(BaseModel):
    category: str
    limit_amount: float