import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-1/2 overflow-hidden '>

      <DotLottieReact
        src="https://lottie.host/49c07800-8b8c-4eb0-a04a-900ac2075563/9OzNF1767C.lottie"
        loop
        autoplay

      />
    </div>
  );
}
export default Loader;
