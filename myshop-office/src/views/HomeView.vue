<script setup>
let message = "Bienvenue sur la boutique de Manga"
</script>
<template>
  <div>
    <h1>HomeView</h1>
    <p>{{ message }}</p>
    <router-link to="/products/list">Voir les mangas</router-link>
  </div>
</template>


