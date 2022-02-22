import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'

import HeroImage from '../components/HeroImage'
import HeroCard from '../components/HeroCard'

const Heroes = () => {
  const { slug } = useParams()
  const location = useLocation()
  const [heroes, setHeroes] = useState([])

  useEffect(() => {
    fetch('https://nodejs04heroes.herokuapp.com/heroes')
      .then(response => response.json())
      .then(data => setHeroes(data))
  }, [])

  useEffect(() => {
    fetch('https://nodejs04heroes.herokuapp.com/heroes')
    .then(response => response.json())
    .then(data => setHeroes(data))
  },[location.pathname])

  if (!heroes) {
    return <p>Chargement...</p>    
  }

  const handleReset = () => {
    fetch(`https://nodejs04heroes.herokuapp.com/heroes/`, {
      method: "put"
    })
    .then(response => response.json())
    .then(data => setHeroes(data))
  }

  // console.log(location)
  return (
    <>
      {!slug ? 
      <>
        <div className="row">
          <div className='col-6'>
            <h1>
              <Link to="/" className='text-decoration-none'>
                The Avengers
              </Link>
            </h1>
          </div>
          <div className='col-6 justify-content-end align-self-center d-flex'>
            <button type="button" className="btn btn-outline-info"><Link to="/form" className='link text-decoration-none'>Create a new Avenger...</Link></button>
            <button type="button" className="btn btn-outline-success ms-3" onClick={handleReset}>Reset</button>
          </div>
        </div>
        <div className="row">
          {heroes.map((element, index) => {
            return (
              <HeroImage 
                key={index} 
                slug={element.slug}
                image={element.image}
              />
            )
          })}
        </div>
      </>
      : 
      <>
        <div className="row">
          <div className='col-6'>
            <h1>The Avengers</h1>
          </div>
        </div>
          <HeroCard />
      </>
      }
    </>
  )
}

export default Heroes