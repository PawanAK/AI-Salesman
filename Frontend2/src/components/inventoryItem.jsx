/* eslint-disable react/prop-types */

function InventoryItem({ item }) {
  return (
    <div className="inventory-item-card">
      <h3>{item.title}</h3>
      <p>{item.category}</p>
      <p>Price: {item.price}</p>
      <p>Low Target: {item.lowTarget}</p>
      <p>High Target: {item.highTarget}</p>
      <p>Description:{item.description}</p>
    </div>
  );
}

export default InventoryItem;
