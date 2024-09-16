import React from 'react'
import { getPosts } from '@/store/back/querya'
import { useQuery, HydrationBoundary, QueryClient, dehydrate, } from '@tanstack/react-query'
import Test from '@/components/main/Test'

const AboutPage = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: getPosts,
  });


  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Test />
      </HydrationBoundary>
    </div>
  )
}

export default AboutPage