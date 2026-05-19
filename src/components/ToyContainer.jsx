import React from "react";
import ToyCard from "./ToyCard";

// Receives the toys array from App and renders a ToyCard for each
function ToyContainer({ toys }) {
  return (
    <div id='toy-collection'>
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  );
}

export default ToyContainer;
