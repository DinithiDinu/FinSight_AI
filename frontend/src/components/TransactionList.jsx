function TransactionList({ transactions }) {

  return (
    <div className="bg-gray-900 p-6 rounded-2xl mt-6">

      <h2 className="text-2xl font-bold mb-4">
        Transactions
      </h2>

      <div className="space-y-4">

        {transactions.map((transaction) => (

          <div
            key={transaction.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between"
          >

            <div>

              <p className="font-semibold">
                {transaction.category}
              </p>

              <p className="text-gray-400 text-sm">
                {transaction.description}
              </p>

            </div>

            <div className="text-right">

              <p
                className={
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                Rs. {transaction.amount}
              </p>

              <p className="text-gray-400 text-sm">
                {transaction.date}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TransactionList;