import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favorite: [],
  }),

  getters: {
    getFavorite: (state) => {
      return state.favorite;
    },
  },

  actions: {
    setFavorite(favorite) {
      this.favorite.push(...favorite);
    },
    removeFavorite(productName) {
      const index = this.favorite.findIndex(
        (item) => item.name === productName
      );
      if (index !== -1) {
        this.favorite.splice(index, 1);
      }
    },
    addFavorite(product){
      if(!this.isFavorite(product.name)){
        this.favorite.push(product);
      }
    },
    isFavorite(favoriteName){
      return this.favorite.some(product => product.name === favoriteName);
    },
  },
});
