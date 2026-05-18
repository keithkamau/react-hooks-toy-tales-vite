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

  return (
    <>
      <Header />
      {/* Pass addToy down so ToyForm can call it on submit */}
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className='buttonContainer'>
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
