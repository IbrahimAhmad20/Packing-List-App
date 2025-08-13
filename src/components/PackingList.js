import { useState } from "react";
import Items from "./Items";

export default function PackingList({
  items,
  onDeleteItems,
  onToggleItem,
  onClear,
}) {
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
