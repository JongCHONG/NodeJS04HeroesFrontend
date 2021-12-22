// import React, { useState } from 'react'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const Formik = props => {
  const navigate = useNavigate()
  const { name, age, color, isAlive, image, power, slug } = props.editHero
  // const [isEdited, setIsEdited] = useState(false)

  const formik = useFormik({
    initialValues: {
      name,
      power: power.join(','),
      color,
      isAlive,
      age,
      image,
    },
    onSubmit: values => {
      let newValues = {}
      newValues = {
        slug: values.name.toLowerCase(),
        ...values
      }
      newValues.power = values.power.split(',')
      if (values.isAlive === "No") {
        newValues.isAlive = false
      } else {
        newValues.isAlive = true
      }
      
      fetch(`https://nodejs04heroes.herokuapp.com/heroes/${slug}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newValues)
      })
      .then(response => response.json())
      .then(data => navigate(`/heroes/${data.slug}`))
        // alert(JSON.stringify(newValues, null, 2))
    }
  })

  // console.log(props.editHero.image)
  return (
    <div>
       <form onSubmit={formik.handleSubmit}>
          <div className="mb-3 d-flex">
            <label htmlFor="name" className="align-self-center form-label me-3" >Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="age" className="align-self-center form-label me-3" >Age</label>
            <input
              id="age"
              name="age"
              type="number"
              min="1"
              max="300"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.age}
            />
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="isAlive">Is he alive?</label>
            <select 
              id="isAlive"
              name="isAlive"
              className="form-select" 
              onChange={formik.handleChange} 
            >
              {formik.values.isAlive === "true" ? 
                <>
                  <option defaultValue="true" >Yes</option>
                  <option value="false">No</option>
                </>
              :
                <>
                  <option value="true">Yes</option>
                  <option defaultValue="false" >No</option>
                </>
              }
            </select>
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="color" className="align-self-center form-label me-3" >Color</label>
            <input
              id="color"
              name="color"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.color}
            />
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="image" className="align-self-center form-label me-3" >Image url</label>
            <input
              id="image"
              name="image"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.image}
            />
          </div>
          <label className="form-label text-danger">Separate your power by <span className='fw-bolder text-warning'>,</span></label>
          <div className="mb-3 d-flex">
            <label htmlFor="power" className="align-self-center form-label me-3" >Power</label>
            {/* {power.map((element, index) => 
              <input
              key={element}
              id="power"
              name={`power[${index}]`}
              type="text"
              className="form-control me-3"
              onChange={formik.handleChange}
              value={element}
              />
            )} */}
              <input
                id="power"
                name="power"
                type="text"
                className="form-control me-3"
                onChange={formik.handleChange}
                value={formik.values.power}
              />
          </div>

          <button className="btn btn-outline-success" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Formik