import React from 'react'
import { Link } from 'react-router-dom'

const HeroImage = props => {
  const { image, slug } = props

  return (
    <>
        <div 
          className="col-4 my-2" 
        >
          <Link to={`/heroes/${slug}`}>  
            <div 
              className='hero-img'
              style={{ backgroundImage: `url(${image}` }}
            >
            </div>
          </Link>
        </div>
    </>
  )
}

export default HeroImage