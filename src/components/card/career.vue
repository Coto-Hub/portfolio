<template>
  <section class="card card-career">
    <div v-if="card.logo" class="card-img">
      <img :src="`data:${card.logo.mime};base64,${card.logo.data}`" alt="Logo"  loading="lazy"/>
    </div>
    <div class="card-content">
      <h1 class="card-title" v-html="card.title"></h1>
      <p class="card-text">
      </p>
    </div>
    <div class="card-footer">
      <a :href="card.map" :title="card.address" target="_blank" class="card-location">
        <p class="location-label">{{ card.location }}</p>
        <span><i class="icon-map"></i>{{ card.city }}</span>
      </a>
      <p>( {{ card.period }} )</p>
    </div>
  </section>
</template>
<script>
  
export default {
    name: 'careerCard',
    props: {
      card: {
        type: Object,
        required: true,
      },
    },
    data: function () {
      return {
      }
    },
    computed: {
    },
    methods: {
    }
}
</script>
  