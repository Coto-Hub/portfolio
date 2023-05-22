<template>
  <div>
    <headerNav :navInfo="navInfo" />
    
    <section class="container">
      <router-view :player="player" :statistics="statistics" :navInfo="navInfo"></router-view>
    </section>
    
    <footerNav />
    
    <cookie />
    <contactModal :navInfo="navInfo" v-if="navInfo.showContactModal" />
  </div>
</template>

<script>
import cookie from "./components/cookie.vue";
import headerNav from "./components/header-nav.vue";
import footerNav from "./components/footer.vue";
import contactModal from "./components/modal/contact.vue";
import { Player } from "./assets/js/player";
import { Statistics } from "./assets/js/statistics";

export default {
    name: 'App',
    components: {
      cookie,
      headerNav,
      footerNav,
      contactModal,
    },
    data: function () {
      return {
        player: {},
        statistics: {},
        navInfo: {
          showContactModal: false,
        },
      }
    },
    mounted() {
    },
    created() {
      this.generatePlayer();
    },
    computed: {
    },
    methods: {
      generatePlayer() {
        this.player = new Player();
        this.statistics = new Statistics(this.player);
      },
    }
}
</script>