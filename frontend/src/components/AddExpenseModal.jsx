import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AddExpenseModal({ onClose, onSaved }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!amount || !category || !date) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not authenticated");
      return;
    }

    const { error } = await supabase.from("expenses").insert([
      {
        user_id: user.id,
        amount: Number(amount),
        category,
        expense_date: date,
        notes,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      onSaved();   // 🔥 THIS refreshes dashboard
      onClose();   // 🔥 THIS closes modal
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Add New Expense</h3>

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.actions}>
          <button onClick={onClose} style={styles.cancel}>
            Cancel
          </button>
          <button onClick={handleSave} style={styles.save}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: 24,
    borderRadius: 10,
    width: 360,
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
  textarea: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    height: 80,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 16,
  },
  cancel: {
    background: "#e5e7eb",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
  },
  save: {
    background: "#111827",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
  },
};
