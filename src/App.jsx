import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'

function App() {


  return (
    <>

    <Provider store={appStore}>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Feed/>}></Route>
        <Route path='/login' element={<Login/>}> </Route>
        
      </Routes>
      
      
      </BrowserRouter>

    </Provider>
  
    </>
  )
}

export default App
