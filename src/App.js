import { useState } from "react";

export default function App() {
  const [items, setItem] = useState([]);

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
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
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
function PackingList({ items, onDeleteItems, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((items) => (
          <Items
            Item={items}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            key={items.id}
          />
        ))}
      </ul>
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
