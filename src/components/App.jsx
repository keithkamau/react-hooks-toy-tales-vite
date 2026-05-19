import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  // State to hold the array of toys fetched from the backend
  const [toys, setToys] = useState([]);

  // Fetch all toys from the backend when the component first mounts
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []); // Empty dependency array = runs once on mount

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // POST a new toy to the backend, then add it to state
  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        // Spread existing toys and append the newly created one
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
      {/* Pass addToy down so ToyForm can call it on submit */}
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className='buttonContainer'>
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* Pass all callbacks down to ToyContainer */}
      <ToyContainer toys={toys} deleteToy={deleteToy} updateToy={updateToy} />
    </>
  );
}

export default App;
