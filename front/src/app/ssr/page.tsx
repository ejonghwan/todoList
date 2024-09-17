import React, { Suspense } from 'react'
import SSRCompo from '@/components/main/SSRCompo';

/*
    ### SSR  캐싱 안함
    - 별도 캐싱 작업을 하지 않고 매 요청마다 다시 보낸다
*/
const getPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: "no-store" })
    // const res = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments', { cache: "no-store" })
    console.log('res?', res)
    const data = res.json();
    return data;
 };

/*
    ### SSG  캐싱
    - cache 기본값이라 넣지 않으면 SSG.
    - 캐싱을 강제하여 정적사이트로 만들며, 처음에는 server-side에서 작동하고 다음부터는 캐싱된 값으로 작동함  
    - 빌드 시점에 fetch된 request는 직접 무효화하기 전까지 캐싱됨
*/
// const getPosts = async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: "force-cache" })
//     const data = res.json();
//     return data;
//  };


/*
    ### ISR  주기적으로 데이터 요청
    - { next: { revalidate: 10 } }   10초마다 요청
    - 10초 사이에 데이터 변경이 있다면 별도 빌드 과정이 없어도 해당 데이터로 업데이트
*/
// const getPosts = async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 1 } })
//     const data = res.json();
//     return data;
//  };


const SSR = async () => {

    

    const data = await getPosts();
    console.log('data?', data)

    

    return (
        <div className='flex'>
           <div>
                <h2>server side</h2>
                <Suspense fallback={<div>ssr loading....</div>}>
                {data.map((item: any) => {
                    return (
                        <div key={item.id}>{item.id}</div>
                    )
                })}
                </Suspense>
           </div>
           <div>
                <h2>client side</h2>
                <Suspense fallback={<div>csr loading....</div>}>
                    <SSRCompo data={data} />
                </Suspense>
           </div>
        </div>
    )
}

export default SSR