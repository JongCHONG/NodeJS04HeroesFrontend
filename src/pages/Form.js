import React, { useState } from 'react'

const Form = () => {
  const [slug, setSlug] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [color, setColor] = useState("")
  const [image, setImage] = useState("")
  const [power, setPower] = useState("")
  const [isAlive, setIsAlive] = useState("")
  const [isAdded, setIsAdded] = useState(false)
  const [error, setError] = useState(null)
  
  const handleSubmit = e => {
    e.preventDefault()

    const hero = {
      slug,
      name,
      age,
      color,
      image,
      power,
      isAlive
    }

    fetch('https://nodejs04heroes.herokuapp.com/heroes',{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(hero)
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Avenger already added.")
        }
        response.json()
      })
      .then(
        data => {
          console.log(data)
          setError("")
        },
        err => {
          setError(err)
          setIsAdded(false)
        }
      )

    setIsAdded(true)
    setSlug(name)
    setName("")
    setAge("")
    setColor("")
    setImage("")
    setPower("")
  }

  const handleOnChangeName = e => {
    setName(e.target.value)
    setSlug(e.target.value.toLowerCase())
  }
  const handleOnChangeAge = e => {
    setAge(e.target.value)
  }
  const handleOnChangeColor = e => {
    setColor(e.target.value)
  }
  const handleOnChangeImage = e => {
    setImage(e.target.value)
  }
  const handleOnChangePower = e => {
    setPower([e.target.value.split(",")])
  }
  const handleOnChangeIsAlive = e => {
    if (e.target.value === "false") {
      setIsAlive(false)
    } else {
      setIsAlive(true)
    }
  }

  // console.log(hero)
  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className="row">
        <div className='col-6'>
          <h1>Create your own Avenger!</h1>
        </div>
        <div className='col-6 text-end text-danger align-self-center'>
          <h2>
            {isAdded && `Avenger ${slug} created!`}
            {error && "Avenger already exist.."}
          </h2>
        </div>
      </div>
        <div className="mb-3">
          <label className="form-label">Name : </label>
          <input type="text" className="form-control" value={name} onChange={handleOnChangeName} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age : </label>
          <input type="number" className="form-control" value={age} min="1" max="300" onChange={handleOnChangeAge} />
        </div>
        <div className="mb-3">
          <label className="form-label">Color : </label>
          <input type="text" className="form-control" value={color} onChange={handleOnChangeColor} />
        </div>
        <div className="mb-3">
          <label className="form-label">Image url: </label>
          <input type="text" className="form-control" value={image} onChange={handleOnChangeImage} />
        </div>
        <div className="mb-3">
          <label className="form-label">Power: </label>
          <input type="text" className="form-control" value={power} onChange={handleOnChangePower} />
          <label className="form-label text-danger">Separate your power by <span className='fw-bolder text-warning'>,</span></label>
        </div>
        <div className="mb-3">
          <label className="form-label">Is he/she alive? : </label>
          <select className="form-select" aria-label="Default select example" onChange={handleOnChangeIsAlive} >
            <option value="">--Please choose an option--</option>
            <option defaultValue="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Form