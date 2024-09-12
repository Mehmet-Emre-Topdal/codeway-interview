import { createStore } from 'vuex';
import { getConfigs,addConfig,updateConfig,deleteConfig } from '../api/configService';

export const store = createStore({
    state: {
        configs: [],
        isEditing: false,
        loading: false
    },
    mutations: {
        setConfigs(state, configs) {
            state.configs = configs
        },
        setIsEditing(state, isEditing) {
            state.isEditing = isEditing
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    actions: {
        async fetchConfigs({ commit }, token) {
            
            const configs = await getConfigs(token);
            commit('setConfigs', configs)
          
        },
        async addConfig({ commit }, { newConfig, token }) {
            console.log(newConfig);
            await addConfig(newConfig, token);
            const configs = await getConfigs(token);
            commit('setConfigs', configs)
            
        },
        async updateConfig({ commit }, { id, updatedConfig, token }) {
           
            await updateConfig(id, updatedConfig, token);
            const configs = await getConfigs(token);
            commit('setConfigs', configs);
        
        },
        async deleteConfig({ commit }, { id, token }) {
           
            await deleteConfig(id, token);
            const configs = await getConfigs(token);
            commit('setConfigs', configs)
    
        },
        startEditing({ commit }) {
            commit('setIsEditing', true)
        },
        stopEditing({ commit }) {
            commit('setIsEditing', false)
        },
        startLoading({ commit }) {
            commit('setLoading', true)
        },
        stopLoading({ commit }) {
            commit('setLoading', false)
        }
    },
    getters: {
        configs: state => state.configs,
        isEditing: state => state.isEditing,
        loading: state => state.loading
    },
})
