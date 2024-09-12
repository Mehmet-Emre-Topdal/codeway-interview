<template>
  <div class="table-container">
    <div v-if="loading" class="loading-spinner"></div> <!-- Loading Spinner -->
    <table v-else class="param-table">
      <thead>
        <tr>
          <th>Parameter Key</th>
          <th>Value</th>
          <th>Description</th>
          <th>Create Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="param in configs" :key="param.id">
          <td>{{ param.key }}</td>
          <td>{{ param.value }}</td>
          <td>{{ param.description }}</td>
          <td>{{ new Date(param.createDate).toLocaleString() }}</td>
          <td>
            <button class="edit-button" @click="startEditing(param)" >Edit</button>
            <button class="delete-button" @click="deleteParameter(param.id)" >Delete</button>
          </td>
        </tr>
    
        <ParameterForm :setTempEditParameter="setTempEditParameter" :tempEditParameter="tempEditParameter" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {router} from '@/router';
import { ref } from 'vue';
import ParameterForm from './ParameterForm.vue';
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
    }
    toast.error(error.message || "Parameter could not deleted");
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

@media (max-width: 768px) {

  .table-container  {
    display: none;
  }
}

.table-container {
  padding: 20px;
  background-color: #1e1e2f;
  border-radius: 10px;
  max-height: 80vh;
  overflow-y: auto;

}



.param-table {
  width: 100%;
  border-collapse: collapse;
  color: #e0e0e0;
}

.param-table th,
.param-table td {
  padding: 12px;
  text-align: left;
  vertical-align: top;
}

.param-table th {
  color: #9aa0ac;
}



.edit-button,
.delete-button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;
}


.edit-button {
    background-image: linear-gradient(to bottom, #3b82f6, #0c66e0);
    margin-right: 8px;
}

.delete-button {
    background-image: linear-gradient(to bottom, #e57373, #d32f2f);
}

</style>