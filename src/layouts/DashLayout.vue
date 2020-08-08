<template>
  <main>
    <Navbar />
    <DashNavbar />
    <section class="section py-5">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Application</a></li>
          </ul>
        </nav>
        <router-view></router-view>
      </div>
    </section>
  </main>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import DashNavbar from '@/components/DashNavbar.vue';

export default {
  components: { Navbar, DashNavbar }
};
</script>
