<template>
  <div class="line-container">
    <div class="colors-container">
      <div class="color-glass" v-for="(c, i) in values.colors" :class="c.class"></div>
    </div>
    <div class="tooltip-info" v-html="getInformations()"></div>
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
    methods: {
      getInformations() {
        var goodColor = "?";
        var goodPlace = "?";
        if (this.values.isValidated) {
          goodColor = this.values.goodColor;
          goodPlace = this.values.goodPlace;
        }
        return `
        <ul>
          <li title="Bonne couleur mais mauvaise position">${goodColor}<span class="good-color"></span></li>
          <li title="Bonne couleur et bonne position">${goodPlace}<span class="good-place"></span></li>
        </ul>`;
      },
    }
  };
  </script>
  