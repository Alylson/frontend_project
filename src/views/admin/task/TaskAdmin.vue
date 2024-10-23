<template>
  <div class="content">
    <TaskAdminComponent />
  </div>
</template>

<script>
import TaskAdminComponent from "@/components/admin/task/TaskAdmin.vue";

export default {
  name: "TaskAdmin",
  components: {
    TaskAdminComponent,
  },
};
</script>