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
          <tr v-for="param in parameters" :key="param.id">
            <td>{{ param.key }}</td>
            <td>{{ param.value }}</td>
            <td>{{ param.description }}</td>
            <td>{{ new Date(param.createDate).toLocaleString() }}</td>
            <td>
              <button class="edit-button" @click="editParameter(param)" :disabled="loading">Edit</button>
              <button class="delete-button" @click="deleteParameter(param.id)" :disabled="loading">Delete</button>
            </td>
          </tr>
          <!-- Yeni parametre ekleme satırı -->
          <tr>
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
              <button class="add-button" @click="saveParameter" :disabled="loading">{{ isEditing ? 'SAVE' : 'ADD' }}</button>
              <button v-if="isEditing" class="cancel-button" @click="cancelEdit" :disabled="loading">CANCEL</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getConfigs, addConfig, updateConfig, deleteConfig } from '@/api/apiService'; // API servis fonksiyonlarını import et
  
  const parameters = ref([]);
  const newParameter = ref({
    key: '',
    value: '',
    description: ''
  });
  
  const isEditing = ref(false);
  const currentEditParameter = ref(null);
  const originalKey = ref('');
  const errors = ref({
    key: '',
    value: '',
    description: ''
  });
  const loading = ref(false); // Loading durumu için ref
  
  // Konfigürasyonları backend'den çekme
  const fetchParameters = async () => {
    loading.value = true;
    try {
      parameters.value = await getConfigs(); // API'den verileri çek
    } catch (error) {
      console.error('Failed to fetch parameters:', error.message);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => fetchParameters);
  
  const saveParameter = async () => {
    resetErrors();
  
    if (!newParameter.value.key) {
      errors.value.key = 'Parameter Key is required.';
    }
    if (!newParameter.value.value) {
      errors.value.value = 'Value is required.';
    }
    if (!newParameter.value.description) {
      errors.value.description = 'Description is required.';
    }
  
    if (errors.value.key || errors.value.value || errors.value.description) {
      return;
    }
  
    loading.value = true;
    try {
      if (isEditing.value) {
        await updateConfig(currentEditParameter.value.id, newParameter.value); // Güncelleme işlemi
        isEditing.value = false;
      } else {
        await addConfig(newParameter.value); // Yeni parametre ekleme işlemi
      }
      await fetchParameters(); // Verileri yeniden yükle
      resetNewParameter();
    } catch (error) {
      console.error('Failed to save parameter:', error.message);
    } finally {
      loading.value = false;
    }
  };
  
  const editParameter = (param) => {
    isEditing.value = true;
    currentEditParameter.value = { ...param };
    originalKey.value = param.key;
    newParameter.value = { ...param };
    resetErrors();
  };
  
  const cancelEdit = () => {
    resetNewParameter();
    isEditing.value = false;
    resetErrors();
  };
  
  const deleteParameter = async (id) => {
    loading.value = true;
    try {
      await deleteConfig(id); // Silme işlemi
      await fetchParameters(); // Verileri yeniden yükle
    } catch (error) {
      console.error('Failed to delete parameter:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const resetNewParameter = () => {
    newParameter.value = { key: '', value: '', description: '' };
    currentEditParameter.value = null;
    originalKey.value = '';
  };
  
  const resetErrors = () => {
    errors.value = {
      key: '',
      value: '',
      description: ''
    };
  };
  </script>
  
  <style scoped>
  .table-container {
    padding: 20px;
    background-color: #1e1e2f;
    border-radius: 10px;
  }
  
  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: auto;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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
  
  .param-table input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #2e2e3d;
    background-color: #2e2e3d;
    color: white;
  }
  
  .edit-button,
  .delete-button,
  .cancel-button,
  .add-button {
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
  
  .add-button {
    background-image: linear-gradient(to bottom, #34d399, #059669);
  }
  
  .cancel-button {
    background-image: linear-gradient(to bottom, #9e9e9e, #616161);
    margin-left: 8px;
  }
  
  .error-message {
    margin-top: 4px;
    color: #ff4d4f;
    font-weight: bold;
    font-size: 12px;
  }
  </style>
  