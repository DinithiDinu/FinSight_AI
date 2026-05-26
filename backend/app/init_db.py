from app.database.connection import engine
from app.database.base import Base

from app.models.user import User
from app.models.transaction import Transaction
from app.models.budget import Budget

Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")