<template>
  <main>
    <Navbar />
    <DashNavbar />
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
import DashNavbar from '@/components/DashNavbar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  components: { Navbar, DashNavbar, Breadcrumb }
};
</script>
