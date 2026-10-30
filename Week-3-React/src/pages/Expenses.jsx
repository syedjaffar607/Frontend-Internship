
import { useState, useEffect } from "react";
import "../App.css";

function Expenses() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);


  function addExpense(event) {
    event.preventDefault();

    if (
      title.trim() === "" ||
      amount === "" ||
      Number(amount) <= 0 ||
      date === ""
    ) {
      alert("Please enter a title, valid amount, and date.");
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    };

    if (editingId !== null) {
      setExpenses((previousExpenses) =>
        previousExpenses.map((expense) =>
          expense.id === editingId
            ? { ...expense, ...expenseData }
            : expense
        )
      );
      setEditingId(null);
    } else {
      setExpenses((previousExpenses) => [
        ...previousExpenses,
        { id: Date.now(), ...expenseData },
      ]);
    }

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  }

  function startEdit(expense) {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(String(expense.amount));
    setCategory(expense.category);
    setDate(expense.date);
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  }

  function deleteExpense(id) {
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      filterCategory === "All" ||
      expense.category === filterCategory;

    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categorySummary = expenses.reduce((summary, expense) => {
    summary[expense.category] =
      (summary[expense.category] || 0) + expense.amount;
    return summary;
  }, {});

 
return (
  <main className="tracker">
    <p className="eyebrow">WEEK 3 · REACT MINI-PROJECT</p>
    <h1>Expense Tracker</h1>
    <p className="subtitle">
      Track your spending, one step at a time.
    </p>

    <section className="total-card">
      <p>Total Expenses</p>
      <h2>Rs. {total.toLocaleString()}</h2>
    </section>

    <section className="total-card">
      <h2>Category Summary</h2>
      {Object.keys(categorySummary).length === 0 ? (
        <p>No expenses to summarize yet.</p>
      ) : (
        Object.entries(categorySummary).map(([name, amount]) => (
          <p key={name}>
            {name}: Rs. {amount.toLocaleString()}
          </p>
        ))
      )}
    </section>

    <form className="expense-form" onSubmit={addExpense}>
      <label htmlFor="title">Expense Name</label>
      <input
        id="title"
        type="text"
        placeholder="e.g. Food, Transport"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="amount">Amount (Rs.)</label>
      <input
        id="amount"
        type="number"
        min="0.01"
        step="0.01"
        placeholder="e.g. 500"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Education">Education</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="date">Expense Date</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <button type="submit">
        {editingId !== null ? "Update Expense" : "+ Add Expense"}
      </button>

      {editingId !== null && (
        <button type="button" onClick={cancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
    
    <section className="expense-list">
      <h2>Your Expenses</h2>

      <label htmlFor="searchExpense">Search Expenses</label>
      <input
        id="searchExpense"
        type="text"
        placeholder="Search by expense name..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <label htmlFor="filterCategory">Filter by Category</label>
      <select
        id="filterCategory"
        value={filterCategory}
        onChange={(event) => setFilterCategory(event.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Education">Education</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      {filteredExpenses.length === 0 ? (
        <p className="empty-message">
          No expenses found in this category.
        </p>
      ) : (
        filteredExpenses.map((expense) => (
          <article className="expense-item" key={expense.id}>
            <div>
              <h3>{expense.title}</h3>
              <p>Rs. {expense.amount.toLocaleString()}</p>
              <p>{expense.category} · {expense.date}</p>
            </div>

            <button
              type="button"
              onClick={() => startEdit(expense)}
            >
              Edit
            </button>

            <button
              className="delete-button"
              type="button"
              onClick={() => deleteExpense(expense.id)}
            >
              Delete
            </button>
          </article>
        ))
      )}
    </section>

  </main>
);
}

export default Expenses;
