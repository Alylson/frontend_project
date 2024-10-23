<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" aria-current="page">
        <span class="text-black-50">Home / Tarefas</span>
      </li>
    </ol>
  </nav>
  <div class="task-list">
    <div class="top-list">
      <h2 class="mb-4">Tarefas</h2>
      <router-link to="/admin/task/create" class="btn btn-primary">
        Cadastrar Tarefa
      </router-link>
    </div>

    <div v-if="isLoading" class="d-flex justify-content-center align-items-center vh-100">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-else>
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="text-column-table-template">ID</th>
            <th class="text-column-table-template">URL</th>
            <th class="text-column-table-template">Status</th>
            <th class="text-column-table-template">Scraping</th>
            <th class="text-column-table-template">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tableTask.data" :key="index" class="align-middle">
            <td class="text-black-50">{{ task.id }}</td>
            <td class="text-black-50" style="width: 60%;">{{ task.url }}</td> 
            <td class="text-black-50">{{ task.status }}</td>   
            <td>
              <button class="btn btn-success btn-sm" @click="executeScraping(task.url, task.id)">
                Executar
              </button>
            </td>
            <td>
              <div class="d-flex justify-content-start">
                <button class="btn btn-primary btn-sm me-2" @click="editTask(task.id)">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <ConfirmDelete
                  :confirmationMessage="'Deseja realmente deletar esta Tarefa?'"
                  :confirmationText="'Esta ação não pode ser desfeita para a Tarefa:'"
                  :successMessage="'Tarefa foi deletada com sucesso.'"
                  @confirmed="deleteTask(task.id)"
                  :refreshList="true"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TaskAdminService from "@/service/admin/TaskAdminService";
import ConfirmDelete from "@/components/admin/ConfirmDelete.vue";

export default {
  name: "TaskAdmin",
  components: {
    ConfirmDelete,
  },
  data() {
    return {
      tableTask: {
        data: []
      },
      isLoading: false,
    };
  },
  created() {
    this.TaskAdminService = new TaskAdminService();
  },
  mounted() {
    this.getTask();
  },
  methods: {
    async getTask() {
      this.isLoading = true;
      const response = await this.TaskAdminService.getIndexTask();

      if (response) {
        this.tableTask = {
          data: response.tasks.map((task) => ({
            ...task,
          }))
        };
      }

      this.isLoading = false;
    },

    async executeScraping(url, id) {
      try {
        this.isLoading = true;

        payload = {
          task_id: id,
          url: url
        }

        const response = await this.TaskAdminService.executeScraping({ payload });

        console.log("Scraping done:", response);
      } catch (error) {
        console.error("Error when scraping:", error);
      } finally {
        this.isLoading = false;
      }
    },

    editTask(id) {
      this.$router.push({ name: "EditTaskAdmin", params: { id: id } });
    },

    async deleteTask(id) {
      try {
        await this.TaskAdminService.deleteTask(id);

        await this.fetchTags();
      } catch (error) {
        this.setFlashMessage(error, "error");
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  position: sticky;
  top: 0;
}

.task-list {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.top-list {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.top-list h2 {
  color: #5ab25e;
}

.table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  padding: 12px 15px;
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-dark {
  background-color: #343a40;
  color: #fff;
}

.table-dark th {
  border-bottom: 2px solid #454d55;
}

.text-column-table-template {
  color: #5ab25e;
  font-weight: 400;
}
</style>
