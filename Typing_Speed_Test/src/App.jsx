import React from 'react'
import Header from './components/Header/Header'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import { useContext } from 'react'
import { SettingContext } from './context/SettingContext/SettingContext'


const App = () => {

  const {difficulty} = useContext(SettingContext);

  return (
    <div className={`bg-neutral-900 font-sora px-25 h-screen`}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result/>} />
      </Routes>
    </div>
  )
}

export default App
