<template>
  <div class="playing-card" :class="card.reverse ? 'reverse' : card.sign">
    <div class="card-inner">
      <div v-if="!card.reverse" class="card-front">
        <div class="card-number card-header">
          <h1>{{ card.value }}</h1>
        </div>
        <i class="big card-icon" />
        <div class="card-number card-footer">
          <h1>{{ card.value }}</h1>
        </div>
      </div>
      <div class="card-back">
        <div class="card-top" />
        <div class="card-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayingCard",
  props: {
    card: {
      type: Object,
      default() {
        return {
          sign: "",
          value: "",
          reverse: true,
        };
      },
    },
  },
  data: function () {
    return {};
  },
};
</script>
