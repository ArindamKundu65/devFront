import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Body from './components/Body'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Requests from './components/Requests'
import Premium from './components/Premium'
import Chat from './components/Chat'


function App() {


  return (
    <>

      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body/>}>
              <Route path='/' element={<Feed />}></Route>
              <Route path='/login' element={<Login />}> </Route>
              <Route path='profile' element={<Profile/>}></Route>
              <Route path='/connections' element={<Connections/>}></Route>
              <Route path='/requests' element={<Requests/>}></Route>
              <Route path='/premium' element={<Premium/>}></Route>
              <Route path='/chat/:targetUserId' element={<Chat/>}></Route>
            </Route>
          </Routes>


        </BrowserRouter>

      </Provider>

    </>
  )
}

export default App
