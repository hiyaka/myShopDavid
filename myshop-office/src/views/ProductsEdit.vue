<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id



let product = ref({})

async function loadProduct() {
    const response = await fetch(`http://localhost:8000/office/products/` + id);
    product.value = (await response.json()).product
    console.log(product.value);

}
if (route.params.id != "0") {
    loadProduct()
}
console.log(route.params.id)

async function saveProduct() {
    console.log(saveProduct)
    const url = route.params.id != "0" ? `http://localhost:8000/office/products/` + id : 'http://localhost:8000/office/products';
    const method = route.params.id != "0" ? 'PUT' : 'POST';

    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product.value)
    });

    //document.location.href = "/products/list";
}

</script>




<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th colspan="2">Edition de l'article</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input v-model="product.name" type="text"></td>
                </tr>
                <tr>
                    <td><textarea v-model="product.description"></textarea></td>
                </tr>
                <tr>
                    <td><input v-model.number="product.price" type="number"></td>
                </tr>
                <tr>
                    <td><button type="button" @click="saveProduct">Enregistrer</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
div {
    text-align: center;
}

table {
    width: 50%;
    margin: 0 auto;
    border: 1px solid #333;
}

input {
    width: 100%;
}

textarea {
    width: 100%;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
    text-align: center;
}
</style>