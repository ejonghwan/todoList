"use client"

import React, { useEffect, useState } from 'react'
import ContentWrap from '@/components/common/contents-wrap/ContentWrap'
import Section from '@/components/common/section/Section'
import Visual from '@/components/main/Visual'
import Pagenations from '@/components/common/pagenation/Pagenation'

import { useUsers, useUser } from '@/store/queryies/user/userQueries'


// test
import { useUserStore } from '@/store/front/user'



import { useQuery, HydrationBoundary, QueryClient, dehydrate, } from '@tanstack/react-query'


import Test from '@/components/main/Test'
import Dehydration from '@/store/utils/dehydration'

type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};



const MainPage = () => {


    const [test11] = useState(() => { return 'aa' })


    // zus test
    const { arr, removeArr, addArr } = useUserStore();
    const [val, setVal] = useState('');
    const handleAddFn = e => {
        // console.log('??', val, arr, addArr)
        addArr(val)
    }



    // test 1
    // const getPosts = async () => {
    //     const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    //     const data: Promise<PostType[]> = res.json();

    //     return data;
    // };



    // const { isLoading, error, data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })


    //test 2 


    // const clientValue = useQuery({ queryKey: ['poosts'], queryFn: getPosts });



    // test 3
    // const test = useQuery({ queryKey: ['test'] })

    const { data, error, isLoading } = useUsers()
    const { data: data11, error: error11, isLoading: isLoading11 } = useUser("30")

    useEffect(() => {
        console.log(data, error, isLoading)
        console.log(data11, error11, isLoading11)
    }, [isLoading, isLoading11])

    return (
        <>
            <div>test 11 ? {test11}</div>
            <Section>
                test test
                {/* {data?.map((item, idx) => {
                    return (
                        <div key={idx}>
                            {item.title}
                        </div>
                    )
                })} */}
            </Section>
            <ContentWrap>
                <Section>
                    <div className={`size-[200px] text-white dark:bg-red-500 bg-blue-500`}>dark</div>
                    <div className='hoho_test w-[500px] border border-gray-900 title1 text-black'>
                        asdasd 깃 설정 변경
                    </div>
                    <button type='button' onClick={() => document.documentElement.classList.add('dark')}>dark??</button>
                    {/* sec 1
                    ?? {isAuth ? 'true' : 'false'}
                    <h1 className="text-2xl">UserName : {username}</h1>
                     <h1 className="text-2xl">uid : {uid}</h1> */}
                    {/* <Visual name={username} /> */}
                </Section>
                <Section>
                    sec 2
                    {arr.map(item => <div key={item.id}>{item.content} <button type='button' onClick={() => removeArr(item.id)}>삭제</button></div>)}

                    <input type="text" value={val} onChange={e => setVal(e.target.value)} />
                    <button type='button' onClick={handleAddFn}>add</button>

                    <div className='flex'>
                        {/* test  1 */}
                        <div style={{ border: "1px solid red" }}>
                            {/* {isLoading && <div>loading....</div>} */}
                            {/* {clientValue.data?.map((item, idx) => {
                                return (
                                    <div key={item.id} >
                                        {item.title}
                                    </div>
                                )
                            })} */}
                        </div>



                        {/* test 2 */}
                        <div style={{ border: "1px solid blue" }}>
                            asdsad
                            {/* 서버 컴포넌트에서 해야되나보네 선언 자체도 */}
                            {/* <Dehydration querykeys={["posts"]} queryFn={getPosts}>
                                {test.data?.map((item, idx) => {
                                    return (
                                        <div key={item.id}>
                                            {item.title}
                                        </div>
                                    )
                                })}
                            </Dehydration> */}
                        </div>

                        {/* test 3 */}
                        <div>
                            {/* <Test /> */}
                        </div>
                    </div>
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