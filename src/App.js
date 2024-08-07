import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 2, description: "Charger", quantity: 1, packed: false },
// ];


export default function App() {

  const [items, setitems] = useState([]);

  function handileadditems(item) {
    setitems((items) => [...items, item])
  }

  function handiledeleteitem(id) {
    setitems((items) => items.filter((items) => items.id !== id))
  }

  function handiletoggelitems(id) {
    setitems((items) => items.map((items) => items.id === id ? { ...items, packed: !items.packed } : items))
  }

  return (
    <div className="app">
      <Logo />
      <Form onadditems={handileadditems} />
      <PackingList items={items} ondeleteitems={handiledeleteitem} onhandlingtoggelitems={handiletoggelitems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>
}

function Form({ onadditems }) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);



  function handilSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newitems = { description, quantity, id: Date.now(), packed: false };
    console.log(newitems);
    onadditems(newitems)

    setDescription("")
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handilSubmit}>
      <h3>what do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>

        {
          Array.from({ length: 20 }, (_, i) => i + 1).map(
            (num) => (
              <option value={num} key={num}>
                {num}
              </option>
            )
          )
        }

      </select>
      <input type="text" placeholder="items..." value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>

    </form>
  );
}
function PackingList({ items, ondeleteitems, onhandlingtoggelitems }) {
  return (
    <div className="list" key={items.id}>
      <ul>
        {
          items.map(
            (item) => (<Item item={item} ondeleteitems={ondeleteitems} onhandlingtoggelitems={onhandlingtoggelitems} key={item.id} />)
          )
        }
      </ul>
    </div>
  );
}

function Item({ item, ondeleteitems, onhandlingtoggelitems }) {
  return (
    <li key={item.id}>
      <input type="checkbox" value="item.packed" onChange={() => onhandlingtoggelitems(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => ondeleteitems(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {

  if (!items.length) {
    return (
      <footer className="stats">
        <em>
          start to add some items 👜 to your packing list ✈️.
        </em>
      </footer>
    );
  }


  const itemslength = items.length;
  const numpacked = items.filter((items) => items.packed).length;
  const percentage = Math.floor((numpacked / itemslength) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "you are ready to go ✈️" :
          `👜You have ${itemslength} items on your list, and already packed ${numpacked} (${percentage}%).`
        }
      </em>
    </footer>
  );
}
