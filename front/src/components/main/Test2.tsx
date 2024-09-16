"use client"
import React, { useState, useEffect } from 'react'
import { getPosts } from '@/store/back/querya'
import { useQuery } from '@tanstack/react-query'


const Test2 = () => {

   const [val, setVal] = useState([])

   const { isLoading, error, data } = useQuery({ queryKey: ['posts'], queryFn: getPosts} )
        

   //test 2 
   const clientValue = useQuery({ queryKey: ['poosts'], queryFn: getPosts });

  return (
    <div>
      <h2>test2 compo</h2>

      <div className='flex'>

         <div>
            {isLoading && <div>...loading</div>}
            {data?.map((item, idx) => {
               return (
                  <div key={idx}> {item.title} </div>
               )
            })}
         </div>

         <div>
            {clientValue.data?.map((item, idx) => {
               return (
                  <div key={idx}> {item.title} </div>
               )
            })}
         </div>

      </div>

     
    </div>
  )
}

export default Test2