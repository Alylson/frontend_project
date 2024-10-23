<template>
  <FlashMessage />

  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" aria-current="page">
        <span class="text-black-50">Home / Tarefas / Cadastrar Tarefa</span>
      </li>
    </ol>
  </nav>

  <div class="content">
    <div class="top-content">
      <h2 class="mb-4">Cadastrar Tarefa</h2>
    </div>

    <div v-if="isLoading" class="d-flex justify-content-center align-items-center vh-100">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div class="form-area">
      <form @submit.prevent="submitForm">
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
            v-if="
              useValidate.formData.url.$invalid && useValidate.formData.url.$dirty
            "
            class="invalid-feedback"
          >
            <span v-if="useValidate.formData.url.required"
              >A url é obrigatória.</span
            >
            <br />
            <span v-if="useValidate.formData.url.minLength"
              >A url deve ter pelo menos 17 caracteres.</span
            >
          </div>
        </div>

        <label for="url" class="form-label">Status</label>
        <div class="mb-3">
          <multiselect
            v-model="selectedStatus"
            :options="status"
            placeholder="Selecione o status"
            label="name"
            track-by="id"
          >
          </multiselect>
        </div>

        <div class="mb-3">&nbsp;&nbsp;&nbsp;&nbsp;</div>

        <router-link to="/admin/task" class="btn btn-danger"> Cancelar </router-link>
        &nbsp;
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading || useValidate.$invalid"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { required, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import TaskAdminService from "@/service/admin/TaskAdminService";
import { useFlashMessage } from "@/service/FlashMessageService";

import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "CreateTaskAdmin",
  setup() {
    const useValidate = useVuelidate();
    const { setFlashMessage } = useFlashMessage();

    const formData = reactive({
      url: "",
      status: [],
    });

    return { useValidate, setFlashMessage, formData };
  },

  data() {
    return {
      isLoading: false,
      status: [
        { id: 1, name: 'Pendente' },
        { id: 2, name: 'Em progresso' },
        { id: 3, name: 'Concluída' },
        { id: 4, name: 'Falha' }
      ],
      selectedStatus: null,
    };
  },
  components: {
    Multiselect
  },
  created() {
    this.TaskAdminService = new TaskAdminService();
  },
  validations() {
    return {
      formData: {
        url: { required, minLength: minLength(17) }
      },
    };
  },
  methods: {
    async submitForm() {
      this.useValidate.$touch();

      this.formData.status = this.selectedStatus ? this.selectedStatus.id : null;

      if (!this.useValidate.$invalid) {
        this.createTask(this.formData);
      }
    },

    async createTask(data) {
      this.isLoading = true;

      try {
        const response = await this.TaskAdminService.createTask(data);

        if (response.success) {
          this.setFlashMessage(response.success.message, "success");
          this.$router.push("/task");
        } else {
          this.setFlashMessage(response, "error");
        }
      } catch (error) {
        this.setFlashMessage("Erro ao cadastrar tarefa: " + error.message, "error");
      } finally {
        this.isLoading = false;
      }
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

.editor {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
}

.editor:focus {
  border-color: #aaa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-content ul {
  display: flex !important;
  flex-wrap: wrap !important;
  list-style-type: none !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  overflow-y: scroll;
}

.modal-content .btn-primary {
  margin: 0 auto;
  width: 250px;
}
.modal-content li {
  flex: 1 1 200px;
  margin: 10px;
}

.card {
  width: 100%;
  padding: 10px;
}

.card .btn {
  width: 250px;
  margin: 0 auto;
}

.card {
  min-height: 100px !important;
  height: auto !important;
  background: #fafafa;
}
.card-body ul {
  display: flex !important;
  flex-wrap: wrap !important;
  list-style-type: none !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
}

.card-body li {
  flex: 1 1 200px;
  margin: 1px;
}

.radio-buttons .active{
  color: #FFF !important;
}

.radio-buttons .btn:hover{
  color: #FFF !important;
}

.radio-buttons .btn-outline-primary{
  border-radius: 6px 0 0 6px !important;
  border-right: 0px !important;
}

.radio-buttons .btn-outline-danger{
  border-radius:  0 6px 6px 0 !important;
  border-left: 0px !important;
}
</style>
