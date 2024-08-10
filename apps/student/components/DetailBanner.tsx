import React from 'react';
import austrilia from '../assets/images/australia.jpg';
function DetailBanner({ height, component }: any) {
  return (
    <div className="w-screen relative">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex items-center justify-start px-32 z-10">
        {component}
      </div>
      <img
        src="/_next/static/media/australia.c5d6272d.jpg"
        className={`w-full  h-[${height}]  object-cover`}
      />
    </div>  
  );
}

export default DetailBanner;
