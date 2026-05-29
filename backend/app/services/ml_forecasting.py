import pandas as pd

from sklearn.linear_model import (
    LinearRegression
)

import numpy as np


def forecast_expenses(
    transactions
):

    expense_transactions = [

        t for t in transactions

        if t.type == "expense"
    ]

    if len(expense_transactions) < 2:

        return 0

    # CREATE DATAFRAME
    data = pd.DataFrame([
        {
            "date": t.date,
            "amount": t.amount
        }

        for t in expense_transactions
    ])

    # CONVERT DATE
    data["date"] = pd.to_datetime(
        data["date"]
    )

    # EXTRACT MONTH
    data["month"] = (
        data["date"]
        .dt.month
    )

    # GROUP BY MONTH
    monthly_expenses = (
        data.groupby("month")[
            "amount"
        ]
        .sum()
        .reset_index()
    )

    # FEATURES
    X = monthly_expenses[
        ["month"]
    ]

    y = monthly_expenses[
        "amount"
    ]

    # TRAIN MODEL
    model = LinearRegression()

    model.fit(X, y)

    # PREDICT NEXT MONTH
    next_month = np.array([
        [X["month"].max() + 1]
    ])

    prediction = model.predict(
        next_month
    )

    return round(
        float(prediction[0]),
        2
    )