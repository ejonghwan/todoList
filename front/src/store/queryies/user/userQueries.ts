import { useQuery } from '@tanstack/react-query'
import { userKeys } from '@/store/queryies/user/userKeys'
import { fetchUsers, fetchUserById } from '@/store/api/user/userApi'



export const useUsers = () => {
    return useQuery({
        queryKey: userKeys.list(),
        queryFn: fetchUsers,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
}


export const useUser = (id: string) => {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => fetchUserById(id),
        staleTime: 15000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
}





// export const useUser = (id: string) => {
//     return useQuery(userKeys.detail(), () => fetchUserById(id));
// }