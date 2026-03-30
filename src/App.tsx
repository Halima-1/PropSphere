import { useState } from 'react'

import './App.css'
import AppkitWrapper from './connection/index'
import ConnectButton from './connectionButton'

function App() {

  return (
    <>
      <AppkitWrapper>
        <div></div>
        <ConnectButton />
      </AppkitWrapper>
    </>
  )
}

export default App
