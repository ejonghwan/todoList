import React from 'react'
import '@/assets/css/common/header.css'

const Header = () => {
  return (
    <header id='header'>
      <div className='header-inner'>
         <h1>logo</h1>
         <ul className='header-inner-items'>
            <li>메뉴1</li>
            <li>메뉴2</li>
            <li>메뉴3</li>
            <li>메뉴4</li>
            <li>메뉴5</li>
         </ul>
      </div>
    </header>
  )
}

export default Header