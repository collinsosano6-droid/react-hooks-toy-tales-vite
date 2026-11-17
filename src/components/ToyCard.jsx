import React from "react";

function ToyCard({toy, deleteToy}) {
  
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

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
