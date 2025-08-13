import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
