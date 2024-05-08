import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),

  getters: {
    getProducts: (state) => {
      return state.products;
    },
  },

  actions: {
    setProducts(products) {
      this.products.push(...products);
    },
  },
});

