"use client"


import { motion } from 'framer-motion'

const Stairs = () => {

   const stairAnimation = {
      initial: {
         top: "0%",
         // opacity: 0,

      },
      animate: {
         top: "100%",
         // opacity: 1,
      },
      exit: {
         top: ["100%", "0%"]
      }
   }

   const reverseIndex = (index: number) => {
      const totalSteps = 6;
      return totalSteps - index - 1
   }



   return (
      <>
         {[...Array(6)].map((_, idx) => {
            return (
               <motion.div
                  key={idx}
                  variants={stairAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                     duration: .2,
                     ease: "easeInOut",
                     delay: reverseIndex(idx) * 0.1,
                  }}
                  className='h-full w-full bg-white relative'
               />
            )
         })}
      </>
   )
}

export default Stairs