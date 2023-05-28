<template>
  <svg width="120" height="120" viewBox="0 0 120 120" :style="`--val: ${timerCount};`">
    <circle cx="60" cy="60" r="54" fill="none" stroke="#767676" stroke-width="12" />
    <circle class="close-circle" cx="60" cy="60" r="54" fill="none" stroke="#222222" stroke-width="15" pathLength="100" />
  </svg>
</template>

<script>

export default {
  name: 'closeSvg',
  props: {
    timerCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {},
  watch : {
  }
};
</script>
    