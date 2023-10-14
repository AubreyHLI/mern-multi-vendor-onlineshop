import React, { useEffect } from "react";
import animationData from "../../assets/animations/53735-cart-icon-loader.json";
import { Player}  from '@lottiefiles/react-lottie-player';

const Loader = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])


  return (
    <div className="w-screen h-screen flex items-center justify-center mx-auto">
        <Player
            autoplay
            loop
            src={animationData}
            style={{ height: '300px', width: '300px' }}
            >
        </Player>        
    </div>

  );
};

export default Loader;