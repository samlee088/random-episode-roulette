import React from "react";

const DisplayButtons = ({ name, length }: { name: string; length: number }) => {
  return (
    <div>
      <h1 className="my-10 font-black text-4xl">{name}</h1>
      <button></button>
      <button>Include</button>
    </div>
  );
};

export default DisplayButtons;
