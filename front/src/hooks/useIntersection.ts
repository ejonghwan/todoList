import { useRef, useState } from 'react';

const useIntersectionObserver = (callback: () => {}) => {


    const [isInter, setIsInter] = useState(false);
    const observer = useRef(
      new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            setIsInter(entry.isIntersecting)
            if (entry.isIntersecting) {
                callback(entry, observer);
            }
          });
        },
        { threshold: 0 }
      )
    );
    
    const observe = (element: any) => {
      observer.current.observe(element);
    };
  
    const unobserve = (element: any) => {
      observer.current.unobserve(element);
    };
  
    return [observe, unobserve, isInter];
  }


export default useIntersectionObserver;