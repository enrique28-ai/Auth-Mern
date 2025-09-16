// Input.jsx
import React from "react";

const Input = ({ icon: Icon, className = "", ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {Icon && <Icon className="h-5 w-5 text-emerald-500" />}
      </div>

      <input
        {...props}
        className={`w-full pl-10 pr-3 py-2 rounded-lg
          bg-slate-800/60 text-white placeholder-slate-400
          border border-slate-700
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
          transition duration-200 ${className}`}
      />
    </div>
  );
};

export default Input;
