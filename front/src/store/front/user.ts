import { create } from 'zustand'

interface Prev {
   arr: { id: string, content: string }[],
   addArr: (val: string) => void,
   removeArr: (id: string) => void
}


export const useUserStore = create(set => ({
   arr: [
      { id: '1', content: 'zz', }
   ],
   addArr: (val: string) => set((prev: Prev) => {
      console.log('user add ?', val, prev)
      return { arr: [...prev.arr, { content: val, id: new Date().getMilliseconds() + val }] }
   }),
   removeArr: (id: string) => set((prev: Prev) => ({ arr: prev.arr.filter(e => e.id !== id) }))
}))












