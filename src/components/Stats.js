export default function Stats({ items }) {
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
