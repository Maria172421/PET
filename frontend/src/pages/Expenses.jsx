import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddExpenseModal from "../components/AddExpenseModal";
import { supabase } from "../supabaseClient";

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/");
      return;
    }
    setUserEmail(user.email);

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("expense_date", { ascending: false })
      .limit(20);

    if (!error) {
      setExpenses(data);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }
  async function handleDeleteExpense(expenseId) {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId);

  if (!error) {
    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== expenseId)
    );
  }
}


  return (
    <div style={styles.container}>
      <div style={styles.header}>
  <div>
    <h2 style={{ margin: 0 }}>Expense Tracker</h2>
    <p style={{ fontSize: "14px", color: "#d1d5db" }}>
      {userEmail}
    </p>
  </div>

  <button style={styles.logoutBtn} onClick={handleLogout}>
    Logout
  </button>
</div>


      {/* Content */}
      <div style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h3>Your Expenses</h3>
            <p style={{ color: "#666" }}>
              Showing latest {expenses.length} expenses
            </p>
          </div>

          <button
            style={styles.addBtn}
            onClick={() => setShowModal(true)}
          >
            + Add Expense
          </button>
        </div>

        {/* Expense List */}
        <div style={styles.grid}>
          {expenses.map((e) => (
            <div key={e.id} style={styles.card}>
  <span style={styles.badge}>{e.category}</span>
  <h3>${e.amount}</h3>
  <p style={styles.date}>
    {new Date(e.expense_date).toDateString()}
  </p>

  <button
    style={styles.deleteBtn}
    onClick={() => handleDeleteExpense(e.id)}
  >
    Delete
  </button>
</div>

          ))}
        </div>
      </div>

      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onSaved={loadExpenses}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f9fafb",
  },
  header: {
    padding: "16px 32px",
    background: "#111827",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutBtn: {
    background: "#374151",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  content: {
  padding: "32px 48px",
  width: "100%",
},

 topRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  maxWidth: "1200px",
  marginInline: "auto",
},

  addBtn: {
    background: "#111827",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "16px",
  maxWidth: "1200px",
  margin: "0 auto",
},


  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  deleteBtn: {
  marginTop: "12px",
  background: "#fee2e2",
  color: "#991b1b",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
},

  badge: {
    background: "#e5e7eb",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    display: "inline-block",
    marginBottom: "8px",
  },
  date: {
    color: "#6b7280",
    fontSize: "14px",
  },
};
