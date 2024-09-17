"use client"

import React, { useEffect, useState } from 'react'
// import { getPosts } from '@/store/back/querya'


const SSRCompo = ({ data }: any) => {


    // props으로 받은 데이터는 서버 사이드에서 작동함
    const [dataa, setDataa] = useState(data);
   

  return (
    <div>
        {dataa.map((item: any) => {
            return (
                // <div key={item.id}>{item.title}</div>
                <div key={item.id}>{item.id}</div>
            )
        })}
    </div>
  )
}

export default SSRCompo