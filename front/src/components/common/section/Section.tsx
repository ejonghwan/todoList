import React from 'react'
import '@/assets/css/common/common.css'

interface Props {
   children: React.ReactNode;
   className?: string;
}

const Section = ({ children, className = '' }: Props) => {
  return (
    <section className={`section ${className}`}>
      {children}
   </section>
  )
}

export default Section