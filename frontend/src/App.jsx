import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
    return<>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
}