import React, { memo, useState } from "react";

const NavBar = ({ propi, funi }) => {
  console.log("--Propi---");

  return (
    <>
      <h1>Mmeo-{propi}</h1>
      <div>NavBar</div>
      <button onClick={funi}>Trigger Parent Function</button>
    </>
  );
};

export default memo(NavBar);
