import {useRef, useEffect} from 'react';


export function useAutoScroll(dependencies){
  const containerRef = useRef(null);
  useEffect(() => {
    const containerEle = containerRef.current;
    if(containerEle){
      containerEle.scrollTop = containerEle.scrollHeight;
    }
  },[dependencies]);
  return containerRef;
}