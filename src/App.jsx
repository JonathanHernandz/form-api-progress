import { useState } from 'react'

import './App.css'
import { FormQuote } from './components/Form'

function App() {

  return (
    <>
      <h1 className="title has-text-success has-text-centered">
        Formulario Test-Api-Progress
      </h1>
      <div className="container" style={{ width: 600 }}>
        <div className="columns">
          <div className="column">
            <div className="box">
              <p className="title is-4">Registra tus datos</p>
              <p className="subtitle is-6">
              Test API
              </p>
              {/* Form */}
              <FormQuote/>
              {/* /Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
