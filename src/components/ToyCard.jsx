import React from "react";

function ToyCard({toy, deleteToy, updatedLikes}) {
  
  const {name,image,likes,id} = toy

  //function to handledelete
  const handleDelete = ()=>{
    fetch(`http://localhost:3001/toys/${id}`,{
      method : "DELETE",
    })
    .then(r=>{
      if (!r.ok){throw new Error("Error deleting toy", Error)}
      deleteToy(id)
    })
    .catch(err=>console.log(err))
  }

  //function to handle likes
  const handleLikes = ()=>{
    fetch (`http://localhost:3001/toys/${id}`,{
      method : "PATCH",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({likes : likes + 1}) 
    })
    .then(r=>{
      if (!r.ok){throw new Error("Cannot like toy")}
      return r.json()
    })
    .then(updatedLikes)
    .catch (err=> console.log(err))

  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick = {handleLikes}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
