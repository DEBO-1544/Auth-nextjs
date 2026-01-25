"use client";
import React from 'react';

const LeftPanel = () => {
  return (
    <div className="relative hidden lg:flex w-5/12 xl:w-1/2 flex-col justify-between overflow-hidden bg-surface-light dark:bg-surface-dark p-8 m-4 rounded-2xl">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 h-full w-full bg-cover bg-center" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="text-xl font-bold text-white tracking-tight">CODE-VITA</span>
      </div>

      {/* Testimonial */}
      <div className="relative z-10 max-w-md">
        <blockquote className="text-2xl font-medium leading-normal text-white mb-4">
          "This platform has completely transformed how we build and deploy our web applications. Simply outstanding."
        </blockquote>
        <div className="flex flex-col gap-1">
          <p className="text-white font-semibold">Alex Morgan</p>
          <p className="text-white/80 text-sm">Lead Designer at CreativeLabs</p>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;