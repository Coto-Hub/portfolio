<template>
  <component :is="getComponent" :notification="notification" :timerCount="timerCount" @click="timerCount = 100">
  </component>
</template>

<script>
import {defineAsyncComponent} from "vue";
  
export default {
  name: "NotificationSwitch",
  components: {
  },
  props: {
    notification: {
      type: Notification,
      required: true,
    },
  },
  emits: ['remove'],
  data() {
    return {
      timerCount: 0,
    };
  },
  created() {
  },
  methods: {
  },
  computed: {
    getComponent() {
      return defineAsyncComponent(() => import(`./${this.notification.componentName}.vue`));
    }
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value < 120) {
          setTimeout(() => {
            this.timerCount++;
          }, 75);
        }
        else {
          this.$emit('remove');
        }
      },
      immediate: true
    }
  }
};
</script>
  