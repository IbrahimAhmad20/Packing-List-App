export default function Items({ Item, onDeleteItems, onToggleItem }) {
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
