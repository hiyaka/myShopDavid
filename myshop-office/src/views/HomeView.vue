<script setup>
let message = "Bienvenue sur la boutique de Manga"
</script>
<template>
  <div>
    <h1>Panel admin</h1>
    <p>{{ message }}</p>
    <router-link to="/products/list">Gestions des produits</router-link><br>
    <router-link to="/users/list">Gestions des utilisateurs</router-link>
  </div>
</template>


