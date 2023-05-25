<template>
  <fieldset class="group-container">
    <legend class="group-title h1">{{ group.title }}</legend>
    <skillCard  v-for="s in group.items" :skill="s" />
  </fieldset>
</template>

<script>
import skillCard from '../card/skill.vue';

export default {
  name: "skillsGroup",
  components: {
    skillCard
  },
  props: {
    group: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
    }
  },
  created() {
    this.group.items.reverse();
  },
  methods: {
  }
};
</script>
