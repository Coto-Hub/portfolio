<template>
  <div class="line-container">
    <div class="color-glass" v-for="(c, i) in values.colors" :class="c.class"></div>
    <div class="tooltip-glass">
      <div class="tooltip-info">
        {{ getInformations }}
      </div>
    </div>
  </div>
</template>
  
  <script>
  
  export default {
    name: "MasterSet",
    components: {},
    props: {
      values: {
        type: Array,
        required: true,
      },
      resultLine: {
        type: Array,
        required: true,
      }
    },
    data: function () {
      return {};
    },
    computed: {
      getInformations() {
        console.log(this.resultLine);
        return "";
      },
    }
  };
  </script>
  