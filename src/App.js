import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function App() {
  const [items, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  function handleDeleteItems(id) {
    setItem((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function handleAddItems(item) {
    setItem((currentItems) => [...currentItems, item]);
  }

  function handleToggleItem(id) {
    setItem((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClear() {
    setShowModal(true); // Show the modal
  }

  function confirmClear(items) {
    setItem((items) => []);
    setShowModal(false);
  }

  function cancelClear() {
    setShowModal(false);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClear={handleClear}
      />
      <Stats items={items} />
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to clear the list?"
          onConfirm={confirmClear}
          onCancel={cancelClear}
        />
      )}
    </div>
  );
}

function Logo() {
  return <h1>🌴 FAR AWAY 👜 </h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [num, setNum] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, num, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setNum(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to pack 😍 for your trip?</h3>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <h3>QTY :</h3>
      <select value={num} onChange={(e) => setNum(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onToggleItem, onClear }) {
  const [sortBy, setSortBy] = useState("input");
  let sortItems = [];

  if (sortBy === "input") sortItems = items;

  if (sortBy === "description") {
    sortItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed")
    sortItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortItems.map((items) => (
          <Items
            Item={items}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            key={items.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"input"}>Sort by input</option>
          <option value={"description"}>Sort by description</option>
          <option value={"packed"}>Sort by packed </option>
        </select>

        <button onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}

function Items({ Item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input onClick={() => onToggleItem(Item.id)} type="checkbox" />
      <span>{Item.quantity}</span>
      <span style={Item.packed ? { textDecoration: "line-through" } : {}}>
        {Item.description}
      </span>
      <button onClick={() => onDeleteItems(Item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return <p className="stats"> Start adding some items in your list 🚀</p>;
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = (numPacked / numItems) * 100;
  return (
    <footer className="stats">
      {percentage < 100 ? (
        <em>
          You have {numItems} items on your list, and you already packed{" "}
          {numPacked} item i.e ({percentage}% )
        </em>
      ) : (
        <em>You are ready to fly ✈️</em>
      )}
    </footer>
  );
}
