import React from 'react'
import { getPosts } from '@/store/api/user/userApi'
import { useQuery, HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import Test from '@/components/main/Test'
import Dehydration from '@/store/utils/dehydration'

const AboutPage = async () => {

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //     queryKey: ["posts"],
  //     queryFn: getPosts,
  // });


  return (
    <div>
      {/* <HydrationBoundary state={dehydrate(queryClient)}>
        <Test />
      </HydrationBoundary> */}
      <Dehydration querykeys={["posts"]} queryFn={getPosts}>
        <Test />
      </Dehydration>
    </div>
  )
}

export default AboutPage
