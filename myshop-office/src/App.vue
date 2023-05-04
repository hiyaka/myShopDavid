<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" name="home">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/products/list" name="products">Liste des Mangas</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
