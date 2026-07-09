import {useRef, useEffect} from 'react';

type dependenciesProps = {
  dependencies : {
    id: string;
    message: string;
    sender: string;
    time: number;
  }[];
}

export function useAutoScroll(dependencies : dependenciesProps){
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const containerEle = containerRef.current;
    if(containerEle){
      containerEle.scrollTop = containerEle.scrollHeight;
    }
  },[dependencies]);
  return containerRef;
}