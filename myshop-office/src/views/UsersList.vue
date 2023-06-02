<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserToken } from '/utils'

const router = useRouter()

let users = ref([])
async function loadUsers() {
    try {
        let response = await fetch('http://localhost:8000/office/users', {
            method: "GET",
            headers: {
                'authorization': `Bearer ${getUserToken()}`
            }
        })
        let json = await response.json()
        users.value = json.data
    } catch (e) {
        console.warn(e);
    }

}

function newUser() {
    router.push('/users/edit/0')
}
async function deleteUser(id) {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        try {
            let response = await fetch(`http://localhost:8000/office/users/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getUserToken()}`
                }
            })
            let json = await response.json()
            loadUsers()
        } catch (e) {
            console.warn(e);
        }

    }
}

loadUsers();
</script>