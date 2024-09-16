"use client"

import React, { Fragment } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const PageTransition = ({ children }: { children: React.ReactNode }) => {

   const pathname = usePathname();

   return (
      <AnimatePresence>
         <Fragment key={pathname}>
            <motion.div
               initial={{ opacity: 1 }}
               animate={{ opacity: 0, transition: { delay: 1, duration: .4, ease: 'easeInOut' } }}
               className='h-screen w-screen fixed bg-primary top-0 pointer-events-none'
            />
            {children}
         </Fragment>
      </AnimatePresence>
   )
}

export default PageTransition