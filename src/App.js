import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Heroes from './pages/Heroes'
import Form from './pages/Form'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='main'>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Heroes/>}/>
            <Route exact path="/heroes" element={<Heroes />} />
            <Route path="/heroes/:slug" element={<Heroes />} />
            <Route path="/form" element={<Form />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App