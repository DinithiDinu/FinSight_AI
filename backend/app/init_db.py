from app.database.connection import engine
from app.database.base import Base

from app.models.user import User
from app.models.transaction import Transaction

Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")