import axios from "axios";
import React, { useEffect, useMemo, useState, memo } from "react";
import List from "./List";

let nums = new Array(30000000);
nums.fill(0);

const numi = nums.map((_, id) => {
  return {
    index: id,
    isMagical: id == 299999,
  };
});

const Home = ({ propi }) => {

  const [count, setCount] = useState(0);

  const [arr, setArr] = useState([]);

  const [memoArr, setMemoArr] = useState(numi);

  const isMagicalNumber = useMemo(() => {
    return memoArr.filter((item) => {
      return item.isMagical === true; // Checking the correct object property
    });
  }, []);

  function add(params) {
    setCount((count) => {
      return (count = count + 1);
    });
  }

  useEffect(() => {
    async function getReposne(params) {
      try {
        const response = await axios.get("https://api.restful-api.dev/objects");

        const data = response.data;
        console.log("--date ----", data);
        setArr(data);
        return;
      } catch (error) {
        console.log("whats the error---", error);
      }
    }
    getReposne();
  }, []);

  return (
    // <>
    //   {/* 1. Added minHeight: "100vh" so it centers vertically on the screen */}

    //   <div
    //     style={{
    //       backgroundColor: "red",
    //       padding: "10px",
    //       display: "flex",
    //       alignItems:"center",
    //       justifyItems:"center",
    //       gap:"40px"

    //     }}
    //   >
    //     <div>box1</div>
    //     <div>box2</div>
    //     <div>box3</div>
    //     <div>box4</div>
    //   </div>

    //   <nav>
    //     <ol>
    //       <li>Apples</li>
    //       <li>Bananas</li>
    //       <li>Grapes</li>
    //     </ol>
    //   </nav>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       minHeight: "100vh",
    //       flexDirection: "column", // Stacks table and heading nicely if needed
    //     }}
    //   >
    //     <h1>Crud Application</h1>

    //     {/* 2. Added borderCollapse and cell padding for a professional look */}
    //     <table
    //       style={{
    //         border: "1px solid black",
    //         borderCollapse: "collapse",
    //         textAlign: "center",
    //       }}
    //     >
    //       <thead>
    //         <tr style={{ backgroundColor: "#f0f0f0" }}>
    //           <th style={{ border: "1px solid black", padding: "8px" }}>
    //             Name
    //           </th>
    //           <th style={{ border: "1px solid black", padding: "8px" }}>
    //             Email
    //           </th>
    //           <th style={{ border: "1px solid black", padding: "8px" }}>
    //             Password
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td style={{ border: "1px solid black", padding: "8px" }}>
    //             Rahul
    //           </td>
    //           <td style={{ border: "1px solid black", padding: "8px" }}>
    //             rahul@gmail.com
    //           </td>
    //           <td style={{ border: "1px solid black", padding: "8px" }}>
    //             rahul123
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>

    //     <form
    //       action="post"
    //       id="formi"
    //       style={{ padding: "20px" }}
    //       className=".formi"
    //     >
    //       <label htmlFor="email"> Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         id="email"
    //         placeholder="enter yout email"
    //         required
    //       />

    //       <button type="submit"> Click here ro get</button>
    //     </form>

    //     <div>
    //       <div
    //         style={{
    //           padding: "10px",
    //           border: "4px solid blue",
    //           margin: "10px",
    //           backgroundColor: "red",
    //           height: "50px",
    //           width: "100px",
    //           fontFamily: "monospace",
    //           color: "green",
    //           fontStyle: "italic",
    //           fontSize: "20px",
    //         }}
    //       >
    //         BOX Model
    //       </div>
    //       <div
    //         style={{
    //           padding: "10px",
    //           border: "4px solid blue",
    //           margin: "10px",
    //           backgroundColor: "red",
    //           height: "50px",
    //           width: "100px",
    //         }}
    //       >
    //         BOX Model
    //       </div>
    //     </div>
    //   </div>

    //    <div
    //     style={{
    //       position: "relative", // The landing pad
    //       height: "200px",
    //       width: "300px",
    //       backgroundColor: "aqua",
    //     }}
    //   >
    //     {/* This can fly anywhere inside the aqua box! */}
    //     <div
    //       style={{
    //         position: "absolute",
    //         top: "10px",
    //         right: "10px", // Pinned to the top-right corner of the aqua box
    //         backgroundColor: "red",
    //         color: "white",
    //       }}
    //     >
    //       I am a floating badge!
    //     </div>
    //   </div>
    //   */
    // </>
    <>
      <h1>{count}</h1>

      <h1>Magical Number : {isMagicalNumber[0].index}</h1>
      <button
        onClick={function () {
          setCount((count) => {
            return (count = count + 1);
          });
        }}
      >
        Counter +rahul+{" "}
      </button>

      <h2>Showing all th elists</h2>
      {arr.length == 0 ? (
        <h1>Loading....</h1>
      ) : (
        <List arr={arr} hi={{ abc: "123", cdef: "456" }} />
      )}
    </>
  );
};

export default memo(Home);
