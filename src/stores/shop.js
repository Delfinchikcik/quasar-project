import { defineStore } from "pinia";

export const useShopStore = defineStore("shop", {
  state: () => ({
    shop: [],
  }),

  getters: {
    getShop: (state) => {
      return state.shop;
    },
  },

  actions: {
    setShop(shop) {
      this.shop.push(...shop);
    },
    removeShop(productName) {
      const index = this.shop.findIndex(
        (item) => item.name === productName
      );
      if (index !== -1) {
        this.shop.splice(index, 1);
      }
    },
    addShop(product){
      if(!this.isShop(product.name)){
        this.shop.push(product);
      }
    },
    isShop(shopName){
      return this.shop.some(product => product.name === shopName);
    },
  },
});
