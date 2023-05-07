import React from 'react'
import Header from '../header/Header'
import Body from '../body/Body'
import Footer from '../footer/Footer'


function Layout() {
  return (
    <section className="layout">
      <header>
        <Header />
      </header>

      <main>
        <Body />
      </main>

      <footer>
        <Footer />
      </footer>
    </section>
  )
}

export default Layout