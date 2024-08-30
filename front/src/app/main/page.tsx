"use client"

import React, {useState} from 'react'
import ContentWrap from '@/components/common/contents-wrap/ContentWrap'
import Section from '@/components/common/section/Section'
import Visual from '@/components/main/Visual'
import Pagenations from '@/components/common/pagenation/Pagenation'


import { useSelector } from "react-redux";


const MainPage = () => {

    const { username, uid, isAuth } = useSelector((state: any) => state.authReducer.value);
    
    const [n, setN] = useState(1)
    return (
        <>
            <ContentWrap>
                <Section>
                    sec 1
                    ?? {isAuth ? 'true' : 'false'}
                    <h1 className="text-2xl">UserName : {username}</h1>
                     <h1 className="text-2xl">uid : {uid}</h1>
                    <Visual name={username} />
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
                </Section>
                <Section>
                    sec 4
                </Section>
            </ContentWrap>
        </>
    )
}

export default MainPage