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

  console.log(heroes)
  return (
    <>
      {!slug ? 
      <>
        <div className="row">
          <div className='col-6'>
            <h1>The Avengers</h1>
          </div>
          <div className='col-6 text-end align-self-center'>
            <Link to="/form">Create a new Avenger...</Link>
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
        <HeroCard />
      }
    </>
  )
}

export default Heroes