
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'


interface Props {
   children: React.ReactNode,
   querykeys: Readonly<string[]>
   // querykeys: any
   queryFn: () => {}
}

const Dehydration = async ({ children, querykeys = [], queryFn }: Props) => {

   console.log(querykeys, queryFn)

   const queryClient = new QueryClient();
   await queryClient.prefetchQuery({
      queryKey: querykeys,
      queryFn: queryFn,
   });

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
   )
}

export default Dehydration