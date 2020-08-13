<template>
  <main>
    <Navbar />
    <AdminNavbar />
    <section class="section py-5">
      <div class="container">
        <Breadcrumb />
        <router-view></router-view>
      </div>
    </section>
  </main>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import AdminNavbar from '@/components/AdminNavbar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  components: { Navbar, AdminNavbar, Breadcrumb }
};
</script>
