import Header from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'


const App = () => {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-neutral-900 px-5 font-sora lg:px-25">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Result/>} />
      </Routes>
    </div>
  )
}

export default App
