import { getCurrentInstance } from 'vue';
import axios from 'axios';

export default class TaskAdminService {
    API_URL = getCurrentInstance().appContext.config.globalProperties.$API_URL_TASK;
    API_URL_SRC = getCurrentInstance().appContext.config.globalProperties.$API_URL_SCR;

    async getIndexTask(limit = 10, page = 1) {
        try {
            const url = this.API_URL + 'tasks';
            const token = localStorage.getItem('authToken');
    
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async getTask(id){
        try {
            const url = this.API_URL + 'tasks/'+id;
            const token = localStorage.getItem('authToken');
    
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
            });
    
            return response.data;
        } catch (error) {
             if(error.response){
                const errorMessage = error?.response?.data?.error?.message  || "Error!";
                
                return errorMessage
            }else{
                return error;
            }
        }
    }

    async createTask(data){
        const url = this.API_URL + 'tasks';
        const token = localStorage.getItem('authToken');
    
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            
            if(error.response){
                const errorMessage = error?.response?.data?.error?.message  || "Error!";
                
                return errorMessage
            }else{
                return error;
            }
        }
    }

    async updateTask(data){
        
        const url = this.API_URL + 'tasks/'+data.id;
        const token = localStorage.getItem('authToken');
    
        try {
            const response = await axios.put(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            
            if(error.response){
                const errorMessage = error?.response?.data?.error?.message  || "Error!";
                
                return errorMessage
            }else{
                return error;
            }
        }
    }

    async deleteTask(id){
        const url = this.API_URL + 'tasks/'+id;
        const token = localStorage.getItem('authToken');
    
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    id: id 
                }
            });
            return response.data;
        } catch (error) {
            
            if(error.response){
                const errorMessage = error?.response?.data?.error?.message  || "Error!";
                
                return errorMessage
            }else{
                return error;
            }
        }  
    }

    async executeScraping(data){
        const url = this.API_URL_SRC + 'scrapings';
        const token = localStorage.getItem('authToken');
    
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            
            if(error.response){
                const errorMessage = error?.response?.data?.error?.message  || "Error!";
                
                return errorMessage
            }else{
                return error;
            }
        }
    }
}