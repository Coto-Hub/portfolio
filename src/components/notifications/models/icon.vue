<template>
  <section class="notification notification-icon" :class="timerCount > 100 ? 'disabled' : ''">
    <span v-if="timerCount > 15" class="notification-close"><closeSvg :timerCount="timerCount"/></span>
    <span class="icon-container" v-if="notification.content.icon"><component :is="getIcon" :success="notification.content.success === true"></component></span>
    <div class="notification-content">
      <h3 class="content-title">{{ notification.content.title }}</h3>
      <p class="content-message">{{ notification.content.message }}</p>
    </div>
  </section>
</template>

<script>
import {defineAsyncComponent} from "vue";
import closeSvg from "./../../svg/close.vue";


export default {
  name: "NotificationWithIcon",
  components: {
    closeSvg,
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
    timerCount: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
  computed: {
    getIcon() {
      return defineAsyncComponent(() => import(`./../../svg/${this.notification.content.icon}.vue`));
    },
  },
  watch: {
  }
};
</script>
  