import React from 'react'
import { getPosts } from '@/store/api/user/userApi'
// import Test from '@/components/main/Test'
import Dehydration from '@/store/utils/dehydration'

import { userKeys } from '@/store/queryies/user/userKeys'
import { fetchUsers, fetchUserById } from '@/store/api/user/userApi'
import Compo from '@/components/ssrQueryTest/Compo'


const QueryTest = async () => {


    /* 
        아 알았다!! 
        Dehydration에 queryKey를 넘기면 nextjs 프리패치때 미리 받는다는거구나 ...
        프리패치때 준비해두고 감싸져있는 컴포넌트에서 useQuery훅을 실행하면 SSR로 작동하는거 !!
    */

    return (
        <div>

            {/* <Dehydration querykeys={["posts"]} queryFn={getPosts}> */}
            <Dehydration querykeys={userKeys.list()} queryFn={fetchUsers}>
                {/* <Test /> */}
                <Compo />
            </Dehydration>
        </div>
    )
}

export default QueryTest
