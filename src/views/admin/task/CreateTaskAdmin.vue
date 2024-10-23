<template>
  <div class="content">
    <CreateTaskAdminComponent />
  </div>
</template>

<script>
import CreateTaskAdminComponent from "@/components/admin/task/CreateTaskAdmin.vue";

export default {
  name: "CreateTaskAdmin",
  components: {
    CreateTaskAdminComponent,
  },
};
</script>