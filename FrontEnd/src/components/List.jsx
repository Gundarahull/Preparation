import React from "react";

import { Link } from "react-router-dom";

const List = ({ arr }) => {
  return (
    <div>
      <h3>Product Catalog</h3>
      {arr.map((item) => {
        const color =
          item.data?.color ||
          item.data?.Color ||
          item.data?.["Strap Colour"] ||
          "N/A";

        return (
          <div
            key={item.id}
            style={{
              margin: "10px 0",
              borderBottom: "1px solid #ccc",
              paddingBottom: "5px",
            }}
          >
            <p>
              <strong>ID:</strong> {item.id} | <strong>Name:</strong>{" "}
              {item.name}
            </p>
            {/* Click this link to go t]o the dynamic route for this specific item */}
            <Link to={`/edit/${item.id}`}>Edit Product</Link>
          </div>
        );
      })}
    </div>
  );
};

export default List;
