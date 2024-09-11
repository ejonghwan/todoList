"use client"

import React, {useState} from 'react'
import ContentWrap from '@/components/common/contents-wrap/ContentWrap'
import Section from '@/components/common/section/Section'
import Visual from '@/components/main/Visual'
import Pagenations from '@/components/common/pagenation/Pagenation'


import { useDispatch, useSelector } from "react-redux";
import { test } from "@/redux/slices/auth-slice"


const MainPage = () => {

    const { isLoggedIn, data } = useSelector((state: any) => state.authReducer);
    
    const [n, setN] = useState(1)

    const dispatch = useDispatch()
    const handleApiTest = () => {
        setN(prev => prev + 1)
        dispatch(test(n))
    }
    return (
        <>
            <ContentWrap>
                <Section>
                    asdasd
                    {/* sec 1
                    ?? {isAuth ? 'true' : 'false'}
                    <h1 className="text-2xl">UserName : {username}</h1>
                     <h1 className="text-2xl">uid : {uid}</h1> */}
                    {/* <Visual name={username} /> */}
                </Section>
                <Section>
                    sec 2

                    <Pagenations 
                        allLength={91}
                        pageNum={n}
                        setPageNum={setN}
                    />                    
                </Section>
                <Section>
                    sec 3
                    <div>isLoggedIn ?? {isLoggedIn ? 'true' : 'false'}</div>
                    <div>{data?.map(item => <div key={item.key}>{item.title}</div>)}</div>
                    <button type="button" onClick={handleApiTest}>zzz api</button>
                </Section>
                <Section>
                    sec 4
                </Section>
            </ContentWrap>
        </>
    )
}

export default MainPage