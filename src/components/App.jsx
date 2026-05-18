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

  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setToys((toys) => toys.filter((toy) => toy.id !== id));
      });
  }

  // PATCH the toy's likes on the backend, then update it in state
  function updateToy(updatedToy) {
    // Map over toys — replace the matching toy, keep all others as-is
    // This preserves the order of toys in the list
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy)),
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className='buttonContainer'>
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* Pass updateToy down to ToyContainer */}
      <ToyContainer toys={toys} deleteToy={deleteToy} updateToy={updateToy} />
    </>
  );
}

export default App;
