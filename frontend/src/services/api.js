const API_URL = "http://localhost:3000/api";

export const fetchExpenses = async (token) => {
  const res = await fetch(`${API_URL}/expenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const addExpense = async (token, expense) => {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense),
  });
  return res.json();
};
