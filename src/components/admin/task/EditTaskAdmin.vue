<template>
  <FlashMessage />

  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" aria-current="page">
        <span class="text-black-50">Home / Tarefas / Editar Tarefa</span>
      </li>
    </ol>
  </nav>

  <div class="content">
    <div class="top-content">
      <h2 class="mb-4">Editar Tarefa</h2>
    </div>

    <div v-if="isLoading" class="d-flex justify-content-center align-items-center vh-100">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div class="form-area">
      <form @submit.prevent="submitForm">
        <input type="hidden" v-model="formData.id" />
        <div class="mb-3">
          <label for="url" class="form-label">URL</label>
          <input
            type="text"
            id="url"
            v-model="formData.url"
            class="form-control"
            :class="{ 'is-invalid': useValidate.formData.url.$error }"
            @blur="useValidate.formData.url.$touch()"
            required
          />
          
          <div
            v-if="useValidate.formData.url.$invalid && useValidate.formData.url.$dirty"
            class="invalid-feedback"
          >
            <span v-if="useValidate.formData.url.required">A url é obrigatório.</span>
            <br />
            <span v-if="useValidate.formData.url.minLength"
              >O nome deve ter pelo menos 2 caracteres.</span
            >
          </div>
        </div>

        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <multiselect
            v-model="selectedStatus"
            :options="status"
            placeholder="Selecione o status"
            label="name"
            track-by="id"
          >
          </multiselect>
        </div>

        <router-link to="/admin/task" class="btn btn-danger"> Cancelar </router-link>
        &nbsp;
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading || useValidate.$invalid"
        >
          Salvar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import TaskAdminService from "@/service/admin/TaskAdminService";
import { useFlashMessage } from "@/service/FlashMessageService";

import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "EditTaskAdmin",
  data() {
    return {
      formData: {
        id: "",
        url: "",
      },
      selectedStatus: null,
      status: [
        { id: 1, name: 'Pendente' },
        { id: 2, name: 'Em progresso' },
        { id: 3, name: 'Concluída' },
        { id: 4, name: 'Falha' }
      ],
      isLoading: false,
    };
  },
  components: {
    Multiselect
  },
  mounted() {
    this.TaskAdminService = new TaskAdminService();
    this.getTask();
  },
  validations() {
    return {
      formData: {
        url: { required, minLength: minLength(17) },
      },
    };
  },
  setup() {
    const useValidate = useVuelidate();
    const { setFlashMessage } = useFlashMessage();
    return { useValidate, setFlashMessage };
  },
  methods: {
    async getTask() {
      const id = this.$route.params.id;

      this.loading = true;

      try {
        const response = await this.TaskAdminService.getTask(id);

        console.log('Response status:', response.status); 
        if (response) {
          this.formData = response;
          this.formData.url = response.url;

          this.selectedStatus = this.status.find(option => option.id === parseInt(response.status, 10));

        } else {
          this.setFlashMessage(response, "error");
          this.$router.push("task");
        }
      } catch (error) {
        this.setFlashMessage(error.message, "error");
        this.$router.push("task");
      } finally {
        this.loading = false;
      }
    },
    async submitForm() {
      this.useValidate.$touch();

      if (!this.useValidate.$invalid) {
        this.editTask(this.formData);
      }
    },

    async editTask(data) {
      this.isLoading = true;

      data.status = this.selectedStatus ? this.selectedStatus.id : null;
      
      const response = await this.TaskAdminService.updateTask(data);

      if (response.success) {
        this.setFlashMessage(response.success.message, "success");
        this.$router.push("task");
      } else {
        this.setFlashMessage(response, "error");
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.is-invalid {
  border-color: #dc3545;
}
.invalid-feedback {
  color: #dc3545;
}

.content {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.top-content {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.top-content h2 {
  color: #5ab25e;
}

.form-area {
  padding: 25px 175px;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label,
input {
  color: rgba(0, 0, 0, 0.5) !important;
}

.btn {
  border-radius: 6px !important;
}

/* .alert-success {
  background-color: #d4edda;
  color: #155724;
} */
</style>
