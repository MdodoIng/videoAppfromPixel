import {useEffect, useState} from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState('')

  useEffect(() => {
    if (typeof window !== undefined) {
      const changeWindowWidth = () => {

        setWindowWidth(window.innerWidth);
      }
      
      window.addEventListener('resize' ,changeWindowWidth)

      changeWindowWidth()

      return () => window.removeEventListener('resize', changeWindowWidth)
    }
  }, []);
  
  return windowWidth;
};

export default useWindowWidth;
