<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown pr-3">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Administrador
          </a>          
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#" @click="logout()">Sair</a></li>
          </ul>          
        </li>
      </ul>
    </div>
  </div>
  </nav>
</template>

<script>
import AuthService from '@/service/AuthService';

export default {
  data() {
    return {
      isLoading: false
    };
  },
  created() {
    this.AuthService = new AuthService();
  },
  methods: {
    async logout() {
      try {
        this.isLoading = true;
        await this.AuthService.logout();

        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
