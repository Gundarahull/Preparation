import { create } from 'zustand';

// 1. Add `get` right next to `set` in the parameters
const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  
  // Action: Set initial products
  setProducts: (products) => set({ products }),

  // Action: Add a product (Create) using `get()` for a duplicate check
  addProduct: (newProduct) => {
    // Grab the current array of products using get()
    const currentProducts = get().products;
    const exists = currentProducts.some((p) => p.id === newProduct.id);

    if (exists) {
      console.warn("Product with this ID already exists!");
      return;
    }

    // Otherwise, update the state safely
    set((state) => ({
      products: [...state.products, newProduct]
    }));
  },

  // Action: Delete a product (Delete)
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id)
  })),

  // Helper Action: Get a single product by ID using `get()`
  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  }
}));

export default useProductStore;