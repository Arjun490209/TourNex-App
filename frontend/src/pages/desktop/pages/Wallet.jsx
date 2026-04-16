import React from "react";

const Wallet = () => {
  const transactions = [
    { id: 1, user: "Arjun", amount: 100, type: "credit" },
    { id: 2, user: "Rohit", amount: 50, type: "debit" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Wallet</h1>

      {/* Balance */}
      <div className="bg-green-500 text-white p-4 rounded-xl mb-4">
        <h2>Total Balance</h2>
        <p className="text-2xl font-bold">₹10,000</p>
      </div>

      {/* Transactions */}
      <div className="bg-white p-4 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>User</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b">
                <td>{t.user}</td>
                <td>₹{t.amount}</td>
                <td
                  className={
                    t.type === "credit" ? "text-green-500" : "text-red-500"
                  }
                >
                  {t.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wallet;
