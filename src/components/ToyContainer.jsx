import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, deleteToy, updatedLikes}) {
  return (
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {toys.map((toy)=>
        <ToyCard key={toy.id} toy={toy} deleteToy={deleteToy} updatedLikes={updatedLikes}/>
      )}
      </div>
  );
}

export default ToyContainer;
