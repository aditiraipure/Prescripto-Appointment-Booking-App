import React from 'react'
import Header from '../component/Header'
import SpecialMenu from '../component/SpecialMenu'
import TopDoctors from '../component/TopDoctors'
import Banner from '../component/Banner'

function Home() {
  return (
    <div>
    <Header></Header>
    <SpecialMenu></SpecialMenu>
    <TopDoctors></TopDoctors>
    <Banner></Banner>
    </div>
  )
}

export default Home
