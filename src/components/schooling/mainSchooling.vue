<template>
  <section class="schooling-container">
    <h2 class="part-title">L'historique de notre offre</h2>
    <div class="schooling-timeline">
      <schoolingCard v-for="(c, i) in schooling" :key="i" :card="c" />
    </div>
  </section>
</template>
<script>
import schoolingData from './../../assets/json/schooling.json';
import schoolingCard from './../card/schooling.vue';

export default {
    name: 'mainSchooling',
    components: {
      schoolingCard
    },
    props: {
    },
    data: function () {
      return {
        schooling: schoolingData,
      }
    },
    computed: {
    },
    methods: {
    }
}
</script>
  