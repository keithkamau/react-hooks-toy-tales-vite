import React from "react";
import ToyCard from "./ToyCard";

// Receives toys and deleteToy from App, passes them to each ToyCard
function ToyContainer({ toys, deleteToy }) {
  return (
    <div id='toy-collection'>
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} deleteToy={deleteToy} />
      ))}
    </div>
  );
}

export default ToyContainer;
