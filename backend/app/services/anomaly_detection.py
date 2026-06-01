from collections import defaultdict


def detect_anomalies(transactions):

    category_totals = defaultdict(float)

    for t in transactions:

        if t.type == "expense":

            category_totals[t.category] += t.amount

    if not category_totals:
        return []

    avg_spending = (
        sum(category_totals.values())
        / len(category_totals)
    )

    anomalies = []

    for category, amount in category_totals.items():

        if amount > avg_spending * 1.5:

            anomalies.append(
                f"⚠️ Unusually high spending detected in {category} (Rs. {amount:.2f})"
            )

    return anomalies