import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        setToys((toys) => [...toys, createdToy]);
      });
  }

  // DELETE toy from backend, then remove it from state by id
  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Keep every toy except the one that was deleted
        setToys((toys) => toys.filter((toy) => toy.id !== id));
      });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className='buttonContainer'>
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* Pass deleteToy down to ToyContainer */}
      <ToyContainer toys={toys} deleteToy={deleteToy} />
    </>
  );
}

export default App;
