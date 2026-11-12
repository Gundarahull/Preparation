import useProductStore from "../store/Zustand";

const WithStore = () => {
  // Grab just the data and the delete action from the store!
  const { products, deleteProduct } = useProductStore();

  return (
    <div>
      {products.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => deleteProduct(item.id)}>Delete 🗑️</button>
        </div>
      ))}
    </div>
  );
};

export default WithStore;
