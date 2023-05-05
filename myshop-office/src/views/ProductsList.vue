<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
let products = ref([]);
async function loadProducts() {
    const response = await fetch('http://localhost:8000/office/products');
    products.value = await response.json()
    console.log(response);
}
loadProducts()

async function deleteProduct(id) {
    await fetch(`http://localhost:8000/office/products/` + id, {
        method: "DELETE"
    })
    loadProducts()
}
</script>

<template>
    <div>
        <router-link :to="'/products/edit/0'">Ajouter un manga</router-link>
    </div>
    <table>
        <thead>
            <tr>
                <th colspan="1">nom</th>
                <th colspan="1">description</th>
                <th colspan="1">prix</th>
                <th colspan="2">Gestion</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>
                    {{ product.name }}
                </td>
                <td>
                    {{ product.description }}
                </td>
                <td>
                    {{ product.price }}
                </td>
                <td>
                    <RouterLink :to="'/products/edit/' + product.id">éditer</RouterLink>
                </td>
                <td>
                    <a href="#" @click=" deleteProduct(product.id)">Supp</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
td {
    border: 1px solid #333;
}

table {
    width: 50%;
    margin: 0 auto;
    border: 1px solid #333;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
    text-align: center;
}
</style>

