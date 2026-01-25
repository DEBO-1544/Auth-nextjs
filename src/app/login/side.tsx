"use client";
import React from 'react';

const LeftPanel = () => {
  return (
    <div className="hidden lg:flex w-1/2 relative bg-[#137fec]/5 items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" 
        style={{ backgroundImage: 'url("https://images.pexels.com/photos/4040649/pexels-photo-4040649.jpeg")' }}
      >
      </div>
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101922]/80 via-transparent to-transparent"></div>
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full p-16 mt-auto">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10 max-w-lg">
          <p className="text-white text-3xl font-bold leading-tight tracking-tight mb-4">
            Design the future of digital experiences.
          </p>
          <p className="text-white/80 text-base font-normal leading-relaxed">
            Join our community of creators and build something extraordinary today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;