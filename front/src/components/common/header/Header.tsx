import React from 'react'
import ContentWrap from '@/components/common/contents-wrap/ContentWrap'
import '@/assets/css/common/common.css'
import Link from 'next/link'

const Header = () => {
  return (
    <header id='header'>
      <ContentWrap>
         <div className='header-inner'>
            <h1><Link href="/">logo</Link></h1>
            <ul className='header-inner-items'>
               <li><Link href="/about">about</Link></li>
               <li>메뉴2</li>
               <li>메뉴3</li>
               <li>메뉴4</li>
               <li>메뉴5</li>
            </ul>
         </div>
      </ContentWrap>
    </header>
  )
}

export default Header