import React from "react";

// Displays a single toy's details with like and delete functionality
function ToyCard({ toy, deleteToy }) {
  // Call deleteToy with this toy's id when the donate button is clicked
  function handleDelete() {
    deleteToy(toy.id);
  }

  return (
    <div className='card' data-testid='toy-card'>
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className='toy-avatar' />
      <p>{toy.likes} Likes </p>
      <button className='like-btn'>Like {"<3"}</button>
      <button className='del-btn' onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
