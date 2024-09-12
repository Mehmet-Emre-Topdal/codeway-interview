<template>
    <tr class="web-form">
        <td>
            <input v-model="newParameter.key" placeholder="New Parameter" :disabled="loading" />
            <div v-if="errors.key" class="error-message">{{ errors.key }}</div>
        </td>
        <td>
            <input v-model="newParameter.value" placeholder="Value" :disabled="loading" />
            <div v-if="errors.value" class="error-message">{{ errors.value }}</div>
        </td>
        <td colspan="2">
            <input v-model="newParameter.description" placeholder="New Description" :disabled="loading" />
            <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
        </td>
        <td>
            <button v-if="isEditing" class="save-button" @click="editParameter" :disabled="loading">SAVE</button>
            <button v-else class="save-button" @click="addParameter" :disabled="loading">ADD</button>


            <button v-if="isEditing" class="cancel-button" @click="cancelEdit" :disabled="loading">CANCEL</button>
        </td>
    </tr>
    <div class="mobile-form">
        <div class="input-container">
            <input v-model="newParameter.key" placeholder="New Parameter" :disabled="loading" />
            <div v-if="errors.key" class="error-message">{{ errors.key }}</div>
        </div>
        <div class="input-container">
            <input v-model="newParameter.value" placeholder="Value" :disabled="loading" />
            <div v-if="errors.value" class="error-message">{{ errors.value }}</div>
        </div>
        <div class="input-container">
            <input v-model="newParameter.description" placeholder="New Description" :disabled="loading" />
            <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
        </div>
        <div class="input-container">
            <button v-if="isEditing" class="save-button" @click="editParameter" :disabled="loading">SAVE</button>
            <button v-else class="save-button" @click="addParameter" :disabled="loading">ADD</button>
        </div>
        <div class="input-container">
            <button v-if="isEditing" class="cancel-button" @click="cancelEdit" :disabled="loading">CANCEL</button>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { computed } from 'vue'
import { useStore } from 'vuex'
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

const props = defineProps({
    tempEditParameter: Object,
    setTempEditParameter: Function
});

const store = useStore()

const isEditing = computed(() => store.getters.isEditing)

const newParameter = ref({
    key: '',
    value: '',
    description: ''
});

const errors = ref({
    key: '',
    value: '',
    description: ''
});


const editParameter = async () => {
    try {

        store.dispatch("startEditing");
        const updatedConfig = { ...props.tempEditParameter };

        updatedConfig.key = newParameter.value.key.trim();
        updatedConfig.value = newParameter.value.value.trim();
        updatedConfig.description = newParameter.value.description.trim();

        const token = localStorage.getItem('authToken');

        store.dispatch("startLoading")
        await store.dispatch("updateConfig", { id: updatedConfig.id, updatedConfig, token });

        store.dispatch("stopEditing");
        resetNewParameter();

    } catch (error) {
        console.log(error.message + "işte mesaj")
        if (error.message === "Unauthorized user") {
            redirectToLogin();
        }
        toast.error(error.message || "Parameter could not updated");
    } finally {
        store.dispatch("stopLoading")
    }

};

const addParameter = async () => {

    try {
        const isFormValid = validateForm()

        if (!isFormValid) return;

        resetErrors();

        const newConfig = { ...newParameter.value };
        newConfig.key = newConfig.key.trim();
        newConfig.value = newConfig.value.trim();
        newConfig.description = newConfig.description.trim();

        store.dispatch("startLoading");
        const token = localStorage.getItem('authToken');
        await store.dispatch("addConfig", { newConfig, token });

        resetNewParameter();
    }
    catch (error) {

        if (error.message === "Unauthorized user") {
            redirectToLogin();
        }
        toast.error(error.message || "Parameter could not added");
    } finally {
        store.dispatch("stopLoading")
    }


};

const validateForm = () => {
    errors.value = {
        key: newParameter.value.key ? '' : 'Parameter Key is required.',
        value: newParameter.value.value ? '' : 'Value is required.',
        description: newParameter.value.description ? '' : 'Description is required.'
    };
    return !errors.value.key && !errors.value.value && !errors.value.description;
}

const resetNewParameter = () => {
    newParameter.value = { key: '', value: '', description: '' };

};

const resetErrors = () => {
    errors.value = {
        key: '',
        value: '',
        description: ''
    };
};


const cancelEdit = () => {
    props.setTempEditParameter(null);
    resetNewParameter();
    store.dispatch("stopEditing");
    resetErrors();
};

const redirectToLogin = () => {
    router.push('/login');
    localStorage.removeItem('authToken');
};
</script>

<style scoped>
.mobile-form {
    padding: 10px;
}

.mobile-form * {
    margin-bottom: 4px;
}



.mobile-form button {
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    color: white;
}

.mobile-form .cancel-button {
    margin: 0;
}



.error-message {
    margin-top: 4px;
    color: #ff4d4f;
    font-weight: bold;
    font-size: 12px;
}


td {
    padding: 12px;
    text-align: left;
    vertical-align: top;
}



.mobile-form {
    display: block;
}

.web-form {
    display: none;
}


@media (min-width: 768px) {
    .mobile-form {
        display: none;
    }

    .web-form {
        display: table-row;
    }
}
</style>