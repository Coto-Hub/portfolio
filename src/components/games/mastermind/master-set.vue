<template>
  <div class="line-container" :class="`${customOrder[values.id]} ${isActive ? 'active' : ''}`">
    <div class="multiplier">
      ×{{ multiplierList[values.id] }}
    </div>
    <div class="colors-container">
      <div class="color-glass" v-for="(c, i) in values.colors" :class="c.class"></div>
    </div>
    <div class="tooltip-info" v-html="getInformations()"></div>
  </div>
</template>
  
<script>
import { multiplierList } from "../../../assets/js/mastermind.js"

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
      },
      isActive: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        customOrder: ["order-1","order-3","order-5","order-7","order-9", "order-2", "order-4", "order-6", "order-8", "order-10"],
        multiplierList,
      };
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
  