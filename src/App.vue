<template>
  <div>
    <headerNav :navInfo="navInfo" />
    <!--     
    <section class="container">
      <router-view :player="player" :statistics="statistics" :navInfo="navInfo" :notificationCenter="notificationCenter"></router-view>
    </section>
    
    <footerNav />
    
    <cookie />
    <contactModal :navInfo="navInfo" :notificationCenter="notificationCenter" v-if="navInfo.showContactModal" />
    <notificationList :notificationCenter="notificationCenter" /> -->
  </div>
</template>

<script>
import cookie from "./components/cookie.vue";
import headerNav from "./components/header-nav.vue";
import footerNav from "./components/footer.vue";
import contactModal from "./components/modal/contact.vue";
import notificationList from "./components/notifications/main.vue";
import { Player } from "./assets/js/player";
import { Statistics } from "./assets/js/statistics";
import { NotificationCenter, Notification } from "./assets/js/notification";

export default {
  name: 'App',
  components: {
    cookie,
    headerNav,
    footerNav,
    contactModal,
    notificationList,
  },
  data: function () {
    return {
      player: {},
      statistics: {},
      notificationCenter: {},
      navInfo: {
        showContactModal: false,
      },
    }
  },
  mounted() {
  },
  created() {
    this.generatePlayer();
    this.notificationCenter = new NotificationCenter();
  },
  computed: {
    getNotificationCenter() {
      return this.notificationCenter;
    }
  },
  methods: {
    generatePlayer() {
      this.player = new Player();
      this.statistics = new Statistics(this.player);
    },
    addNotif() {
      this.notificationCenter.addNotification(new Notification("icon", {
        title: "Messagerie",
        message: "Le mail a bien été envoyé !",
        icon: "contact",
        success: true,
      }));
    }
  }
}
</script>