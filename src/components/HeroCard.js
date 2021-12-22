import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Formik from './Formik'

const HeroCard = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [hero, setHero] = useState(null)
  const [modifyStatus, setModifyStatus] = useState(false)

  useEffect(() => {
    if (slug) {
      fetch(`https://nodejs04heroes.herokuapp.com/heroes/${slug}`)
        .then(response => response.json())
        .then(data => setHero(data))
    }
  }, [slug, modifyStatus])

  if (!hero) {
    return <p>Chargement...</p>   
  }

  const handleDeleteHero = () => {
    fetch(`https://nodejs04heroes.herokuapp.com/heroes/${slug}`, {
      method: "delete",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => console.log(response))
    .then(() => navigate('/')) //attendre que fetch finit de delete
  }
  const handleModifyStatus = () => {
    if (modifyStatus) {
      setModifyStatus(false)
    } else {
      setModifyStatus(true)
    }
  }

  // console.log(hero)
  return (
    <>
      <div 
        className='hero-img'
        style={{ backgroundImage: `url(${hero.image}` }}
      >
      </div>
      <div className='row'>
        <div className='col-6'>
          <h1>{hero.name}</h1>
        </div>
        <div className='col-6 text-end align-self-center'>
          <button 
            type="button" 
            className="btn btn-outline-warning mx-2"
            onClick={handleModifyStatus}
          >
            Edit Avenger
          </button>
          <button 
            type="button" 
            className="btn btn-outline-danger" 
            onClick={handleDeleteHero} 
          >
            Disintegrate Avenger...
          </button>
        </div>
      </div>

      {modifyStatus ? 
       <Formik editHero={hero}/>
      :
      <>
        <p>Name : {hero.name}</p>
        <p>Age : {hero.age}</p>
        <p>Status : {hero.isAlive ? "Alive" : "Dead"}</p>
        <p>Color : {hero.color}</p>
        <p>Power : </p>
        {hero.power.map(element => 
          <p key={element}>{element}</p>
        )}
      </>
      }
    </>
  )
}

export default HeroCard;