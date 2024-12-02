"use client"
import React, { useEffect } from 'react'

import { useUsers, useUser } from '@/store/queryies/user/userQueries'




const Compo = () => {


    const { data, error, isLoading } = useUsers()
    const { data: data11, error: error11, isLoading: isLoading11 } = useUser("30")

    useEffect(() => {
        console.log(data, error, isLoading)
        console.log(data11, error11, isLoading11)
    }, [isLoading, isLoading11])


    return (
        <div>
            <h1>compo</h1>
            {data?.map((item, idx) => {
                return (
                    <div key={idx}>
                        {item.title}
                    </div>
                )
            })}
        </div>
    )
}

export default Compo