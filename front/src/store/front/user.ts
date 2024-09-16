import { create } from 'zustand'

export const useUserStore = create(set => ({
   arr: [
      { 
         id: '1',
         content: 'zz',
      }
   ],
   addArr: (val: string) => set((prev) => {
      console.log('user add ?', val, prev)
      return {arr: [...prev.arr, { content: val, id: new Date().getMilliseconds() + val }]}
   }),
   removeArr: id => set(prev => ({ arr: prev.arr.filter(e => e.id !==id) }))
}))












