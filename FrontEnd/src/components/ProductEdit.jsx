import { useParams, Link } from "react-router-dom";

const ProductDetail = ({ arr }) => {
  // 1. Grab the dynamic :id from the URL
  const { id } = useParams();
  console.log("--whats in the id ===", id);
  console.log("arr--", arr);
  

  // 2. Find the specific item from your array that matches this id
  const product = arr.find((item) => item.id == id);

  // If the product doesn't exist (e.g., typed a fake ID in the URL)
  if (!product) {
    return (
      <div>
        <h2>Product not found!</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Safely extract data properties
  const color =
    product.data?.color ||
    product.data?.Color ||
    product.data?.["Strap Colour"] ||
    "N/A";
  const capacity =
    product.data?.capacity ||
    product.data?.Capacity ||
    product.data?.["capacity GB"] ||
    "N/A";
  const price = product.data?.price || product.data?.Price || "N/A";

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to List</Link>
      <h2>Product Details: {product.name}</h2>
      <p>
        <strong>ID:</strong> {product.id}
      </p>
      <p>
        <strong>Color:</strong> {color}
      </p>
      <p>
        <strong>Capacity/Size:</strong> {capacity}
      </p>
      <p>
        <strong>Price:</strong> {price !== "N/A" ? `$${price}` : "N/A"}
      </p>
    </div>
  );
};

export default ProductDetail;
