<script setup>
import { RouterLink, RouterView } from 'vue-router';

function logout() {
  localStorage.removeItem('user');
  document.location.href = "/login";
}


</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" name="home">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/login" name="login">Login</RouterLink>
        </li>
        <li>
          <a href="javascript:void(0)" @click="logout">Déconnexion</a>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
