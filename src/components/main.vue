<template>
  <div>
    <headerNav />
    <section class="container">
      <profileCard />
      <bjTable />
    </section>
  </div>
</template>

<script>
import headerNav from "../components/header-nav.vue";
import bjTable from "../components/blackjack/bj-table.vue";
import profileCard from "../components/card/profile-card.vue";

export default {
  name: "MainApp",
  components: {
    headerNav,
    profileCard,
    bjTable,
  },
};
</script>
