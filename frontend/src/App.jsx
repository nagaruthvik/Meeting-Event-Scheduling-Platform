import React from 'react'



import {BrowserRouter, Routes,Route} from "react-router-dom"
import LandingPage from './Pages/LandingPage'
import SignUpPage from './Pages/SignUpPage'
import SignInPage from './Pages/SignInPage'
import PreferencePage from './Pages/PreferencePage'
import HomePage from './Pages/HomePage'
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/signIn' element={<SignInPage/>}/>
        <Route path='/Preference' element={<PreferencePage/>}/>
        <Route path='/HomePage' element={<HomePage/>}/>
        
        
      </Routes>
    </BrowserRouter>
  )
}
