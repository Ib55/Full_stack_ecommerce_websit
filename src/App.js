import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Navbar from './components/navbar'
import ProductsDetails from './components/ProductsDetails'
import CategoryProducts from './components/CategoryProducts'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ProfilePage from './components/ProfilePage'
import Axios from 'axios'
import { domain } from './env'

function App() {
  const userToken = window.localStorage.getItem('token')
  console.log(userToken, 'This is user token')

  useEffect(() => {
    if (userToken !== null) {
      const getData = async () => {
        await Axios({
          method: 'get',
          url: `${domain}/api/profile/`,
          headers: {
            Authorization: `token ${userToken}`
          }
        }).then((response) => {
          console.log(response, 'userProfile');
        })
      }
      getData()
    }
  })

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductsDetails />} />
        <Route path='/category/:id' element={<CategoryProducts />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App  