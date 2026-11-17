import React, { useState } from "react";

function ToyForm({ addNewToy }) {

  //initial state of the form
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  })

  //define onSubmit handler
  const handleSubmit = event => {
    event.preventDefault()

    //create object to send to backend with likes set to zero
    const newToy = {
      ...formData, likes: 0
    }
    //send POST request to API
    fetch(`http://localhost:3001/toys`, {
     method : "POST",
     headers : {
      "Content-Type" : "application/json"
     },
     body : JSON.stringify(newToy)
    })
    .then (r=>{
      if (!r.ok){throw new Error ("Failed to add toy", Error)}
      return r.json()
    })
    .then (addedtoy =>{
      addNewToy(addedtoy)
      setFormData({
        name : "",
        image : "",
      })
    })
    .catch(err=> console.log(err))
  // use prop to add new Toy to state and clear state
  }

    //define onChange handler
    const handleChange = event => {
        setFormData(previousData => ({
            ...previousData,
            [event.target.name] : event.target.value
        }))
      }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value = {formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value = {formData.image}
          onChange = {handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
