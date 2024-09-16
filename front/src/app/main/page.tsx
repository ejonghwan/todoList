"use client"

import React, {useState} from 'react'
import ContentWrap from '@/components/common/contents-wrap/ContentWrap'
import Section from '@/components/common/section/Section'
import Visual from '@/components/main/Visual'
import Pagenations from '@/components/common/pagenation/Pagenation'


// test
import { useUserStore } from '@/store/front/user'



const MainPage = () => {


    const { arr, removeArr, addArr } = useUserStore();
    const [val, setVal] = useState(''); 
    const handleAddFn = e => {
        // console.log('??', val, arr, addArr)
        addArr(val)
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

                    {arr.map(item => <div key={item.id}>{item.content} <button type='button' onClick={() => removeArr(item.id)}>삭제</button></div>)}

                    <input type="text" value={val} onChange={e => setVal(e.target.value)}/>
                    <button type='button' onClick={handleAddFn}>add</button>

                    {/* <Pagenations 
                        allLength={91}
                        pageNum={n}
                        setPageNum={setN}
                    />                     */}
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