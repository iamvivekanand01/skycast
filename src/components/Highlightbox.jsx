import React from "react";
const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div className="bg-gray-700 text-white p-5 rounded-2xl flex flex-col justify-between shadow-md transition-transform hover:scale-105 duration-200 flex-1 min-w-[140px] max-w-[200px]">
      <div className="text-sm sm:text-base font-medium text-gray-300">{title}</div>
      <div className="flex items-center justify-between mt-2">
        <Icon className="text-3xl sm:text-4xl text-blue-400" />
        <p className="text-xl sm:text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default HighlightBox;




