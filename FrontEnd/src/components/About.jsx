import React, { useCallback, useState } from "react";
import NavBar from "./NavBar";

const About = () => {
  const [first, setFirst] = useState(0);

  const ccounterChange = () => {
    setFirst((first) => {
      return (first = first + 1);
    });
  };

  // const ChangingFunc = useCallback(() => {
  //   console.log("--hiyying----");
  //   return "Something";
  // }, []);

  // Regular function—no useCallback needed!
  const ChangingFunc = () => {
    console.log("--hiyying----");
    return "Something";
  };

  return (
    <>
      <div>About</div>
      <button onClick={ccounterChange}>Change HERE {first}</button>
      <NavBar propi={"propi"} funi={ChangingFunc} />{" "}
    </>
  );
};

export default About;
