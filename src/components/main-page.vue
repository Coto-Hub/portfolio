<template>
  <div>
    <profileCard />
    <offers :navInfo="navInfo" />
    <career />
    <schooling />
  </div>
</template>

<script>
import offers from "../components/offers.vue";
import schooling from "../components/schooling/mainSchooling.vue";
import career from "../components/career/mainCareer.vue";
import profileCard from "./card/profile.vue";

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
