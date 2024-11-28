import React from 'react'

interface Props {
   children: React.ReactNode
   className?: string
}



const ContentWrap = ({ children, className }: Props) => {
  return (
    <div className={`content-wrap ${className}`}>
      {children}
    </div>
  )
}

export default ContentWrap