import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  //function to fetch toy data from API ----READ
  function loadToys(){
    fetch ('http://localhost:3001/toys')
    .then (r=>{
      if(!r.ok){throw new Error('Failed to fetch toys', Error)}
      return r.json()
    })
    .then (data => setToys(data))
    . catch (err=> console.log(err))
  }

  useEffect(()=>{
    loadToys()
  },[])

  //function to add new toy from backend via props ----CREATE
  const addNewToy = newToy => setToys(previousToys => [...previousToys, newToy])

  //function to delete a toy (donate) ----DELETE
    const deleteToy = deletedToyId => setToys(previousToys => 
      previousToys.filter(toy => toy.id !== deletedToyId))

  //function to update a toy`s likes -----PATCH
  const updatedLikes = updateToy => setToys(previousToys =>
    previousToys.map(toy => toy.id === updateToy.id ? updateToy : toy)
  )


//function to handleClick
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addNewToy= {addNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updatedLikes={updatedLikes}/>
    </>
  );
}

export default App;
