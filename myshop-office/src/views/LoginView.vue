<script setup>
import { ref } from "vue"

let email = ref(''),
    password = ref(''),
    errorMessage = ref('')

//////////////////////// pour récupérer les informations de l'utilisateur à partir du localStorage et les stocker dans la variable user.///////////

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    this.$router.push('/');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function login() {
    //event.preventDefault();

    const loginData = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch('http://localhost:8000/office/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();
        console.log(data)

        if (data.error) {
            console.error(data.error);
            this.errorMessage = "Erreur de connexion. Veuillez vérifier vos identifiants.";

        } else {
            localStorage.setItem('user', JSON.stringify(data.user));
            //this.$router.push('/');
            document.location.href = "/";
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la connexion:', error);
        this.errorMessage = "Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.";
    }
}

</script>



<template>
    <div>
        <h2>Login</h2>
        <form>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="button" @click="login">Se connecter</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>