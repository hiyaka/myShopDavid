<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserToken } from '/utils'

const route = useRoute()
const router = useRouter()

let user = ref({})

async function loadUser() {
    try {
        let response = await fetch(`http://localhost:8000/office/users/${route.params.id}`, {
            headers: {
                'authorization': `Bearer ${getUserToken()}`
            }
        })
        let json = await response.json();
        user.value = json.data;
    } catch (e) {
        console.warn(e);
    }

}

function saveUser() {
    let method = "PUT", url = `http://localhost:8000/office/users/${route.params.id}`
    if (route.params.id == '0') {
        method = "POST"
        url = `http://localhost:8000/office/users`
    }
    try {
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getUserToken()}`
            },
            body: JSON.stringify(user.value)
        })
            .then(response => response.json())
            .then(json => {
                user.value = json.data
                router.push('/users/list')
            });
    } catch (e) {
        console.warn(e);
    }


}

loadUser();
</script>