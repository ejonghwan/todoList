"use client"

import React from 'react'
import ContentWrap from '@/components/common/contents-wrap/ContentWrap'
import Section from '@/components/common/section/Section'
import Visual from '@/components/main/Visual'



import { useSelector } from "react-redux";


const MainPage = () => {

    const { username, uid, isAuth } = useSelector((state: any) => state.authReducer.value);
    

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