import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import './App.css'
import Three from './components/three/Three'

function App() {

  return (
    <Canvas style={{width:'100vw',height:'100vh',backgroundColor:'lightblue'}} >
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
