<template>
  <q-page> </q-page>
</template>

<script setup>
import { ref } from "vue";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
defineOptions({
  name: "FavoritePage",
});
const addToFavorites = async (cardId) => {
  const db = getFirestore();
  const userId = "USER_ID"; // Замените USER_ID на идентификатор текущего пользователя

  try {
    const favoriteRef = doc(db, `favorites/${userId}`);
    await setDoc(
      favoriteRef,
      {
        [cardId]: true, // Используйте ID карточки в качестве ключа
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Ошибка при добавлении в избранное:", error);
  }
};

const removeFromFavorites = async (cardId) => {
  const db = getFirestore();
  const userId = "USER_ID"; // Замените USER_ID на идентификатор текущего пользователя

  try {
    const favoriteRef = doc(db, `favorites/${userId}`);
    await deleteDoc(favoriteRef, cardId);
  } catch (error) {
    console.error("Ошибка при удалении из избранного:", error);
  }
};
</script>
