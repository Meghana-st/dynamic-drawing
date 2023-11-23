import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Toolbar from './Components/Toolbar'
import Canvas from "./Components/Canvas"
import FabricContext from './Components/FabricContext'
import React from 'react'

function App() {

  return (
    <>
    <FabricContext.Provider value={React.createRef()}>
      <Toolbar />
      <Canvas />
    </FabricContext.Provider>
    </>
  )
}

export default App
