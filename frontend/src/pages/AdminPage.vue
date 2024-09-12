<template>
  <div>
    <HeaderComponent />

  
      <ParameterList />
   

 
      <MobileParameterList />
 


  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import ParameterList from '../components/ParameterList.vue';
import MobileParameterList from '../components/MobileParameterList.vue';
import { store } from '@/store/store';


const fetchConfigs = async () => {
  await store.dispatch("fetchConfigs");
};


onMounted(fetchConfigs);

</script>

<style scoped>

</style>