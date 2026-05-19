import React from "react";

// Displays a single toy's details with like and delete functionality
function ToyCard({ toy, deleteToy, updateToy }) {
  function handleDelete() {
    deleteToy(toy.id);
  }

  // PATCH request to increment likes by 1
  // The backend returns the updated toy object which we pass to updateToy
  function handleLike() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        // Pass the updated toy back up to App to update state
        updateToy(updatedToy);
      });
  }

  return (
    <div className='card' data-testid='toy-card'>
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className='toy-avatar' />
      <p>{toy.likes} Likes </p>
      <button className='like-btn' onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className='del-btn' onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
