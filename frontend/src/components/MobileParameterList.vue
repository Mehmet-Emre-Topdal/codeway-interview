<template>
    <div v-if="loading" class="loading-spinner"></div>
    <div v-else class="content-container">

        <div v-for="param in configs" :key="param.id">
            <div>
                <div class="card">
                    <p><b>Parameter Key:</b> {{ param.key }}</p>
                    <p><b>Value:</b> {{ param.value }}</p>
                    <p><b>Description:</b> {{ param.description }}</p>
                    <p><b>Create date:</b> {{ new Date(param.createDate).toLocaleString() }}</p>
                    <div class="buttons-container">
                        <button class="edit-button" @click="startEditing(param)">Edit</button>
                        <button class="delete-button" @click="deleteParameter(param.id)">Del</button>
                    </div>
                </div>
            </div>
        </div>

        <ParameterForm :setTempEditParameter="setTempEditParameter" :tempEditParameter="tempEditParameter" />

    </div>
</template>

<script setup>
import ParameterForm from './ParameterForm.vue';
import { router } from '@/router';
import { ref } from 'vue';
import { computed } from 'vue'
import { useStore } from 'vuex'

import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

const store = useStore()

const configs = computed(() => store.getters.configs)
const loading = computed(() => store.getters.loading)

const tempEditParameter = ref({});

const setTempEditParameter = (param) => {
    tempEditParameter.value = { ...param };
};

const startEditing = (param) => {
    store.dispatch("startEditing");
    tempEditParameter.value = { ...param };

};


const deleteParameter = async (id) => {
    const token = localStorage.getItem('authToken');

    try {
        store.dispatch("startLoading");
        await store.dispatch("deleteConfig", { id, token });
        await store.dispatch("fetchConfigs");
    } catch (error) {
        if (error.message === "Unauthorized user") {
            redirectToLogin();
            toast.error(error.message || "Parameter could not deleted");
        }

    } finally {
        store.dispatch("stopLoading");

    }
};


const redirectToLogin = () => {
    router.push('/login');
    localStorage.removeItem('authToken');
};
</script>

<style scoped>
@media (min-width: 768px) {

    .content-container {
        display: none;
    }

    .loading-spinner {
        display: none;
    }
}

.content-container {
    max-height: 95vh;
    overflow-y: auto;

}

.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    color: #ccc;
}

.buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
}

.card p {
    text-align: left;
}
</style>