<template>
  <div>
    <profileCard />
    <offers :navInfo="navInfo" />
    <career />
    <schooling />
  </div>
</template>

<script>
import offers from "../offers.vue";
import schooling from "../schooling/main.vue";
import career from "../career/main.vue";
import profileCard from "../card/profile.vue";

export default {
  name: "MainApp",
  props: {
    navInfo: {
      type: Object,
      required: true,
    },
  },
  components: {
    profileCard,
    schooling,
    career,
    offers,
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
