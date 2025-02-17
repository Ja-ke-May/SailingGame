"use client"; 
 

import FullPage from "./components/fullpage"
import { useEffect } from "react";



export default function Home() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZG3EYE9D4F';
    script.async = true;
    document.body.appendChild(script);
  
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-ZG3EYE9D4F');
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  
  
  return (
    <div>
      <FullPage />
    </div>
  );
}
