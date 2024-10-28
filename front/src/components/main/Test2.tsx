"use client"
import React, { useState, useEffect, Suspense } from 'react'
import { getPosts } from '@/store/back/querya'
import { useQuery } from '@tanstack/react-query'


const Test2 = () => {

   const [val, setVal] = useState([])

   // prefetch ssr
   // const { isLoading, error, data } = useQuery({ queryKey: ['posts'], queryFn: getPosts} )
   const { isLoading, error, data } = useQuery({ queryKey: ['posts']} )
        

   // csr 
   //test 2 
   const clientValue = useQuery({ queryKey: ['poosts'], queryFn: getPosts });


// asdasd
  
  return (
    <div>
      <h2>test2 compo</h2>

      <div className='flex'>

         <div>
            {/* {isLoading && <div>...loading</div>} */}
            <Suspense fallback={<div style={{ border: "1px solid blue" }}>ssr loading....</div>}>
               {data?.map((item: any, idx: number) => {
                  return (
                     <div key={idx}> {item.title} </div>
                  )
               })}
            </Suspense>
         </div>

         <div>
            {/* {clientValue.isLoading && <div>...loading</div>} */}
            <Suspense fallback={<div style={{ border: "1px solid red" }}>csr loading....</div>}>
               {clientValue.data?.map((item: any, idx: number) => {
                  return (
                     <div key={idx}> {item.title} </div>
                  )
               })}
            </Suspense>
         </div>

      </div>

     
    </div>
  )
}

export default Test2