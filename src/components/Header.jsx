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

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className='buttonContainer'>
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* Pass toys array down to ToyContainer */}
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
