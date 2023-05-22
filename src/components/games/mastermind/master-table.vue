<template>
  <section class="master-container" :class="!roundIsStart ? 'end-game' : ''">
    <div class="player-money">
      Solde : {{ getPlayerMoney }}€
    </div>
    <div class="master-table">
      <masterSet v-for="(p, i) in masterMind.linesColors" :values="p" :resultLine="masterMind.resultLine" />

      <div v-if="getPlayerBet > 0 && !roundIsStart" class="bj-token">
        <div class="bj-btn" @click="startBj()">Start</div>
      </div>
    </div>
    <div class="player-action" :class="playerIsActive ? 'active' : ''">
      <div class="color-glass bg-palette-1" @click="playerClickColor(1)"></div>
      <div class="color-glass bg-palette-2" @click="playerClickColor(2)"></div>
      <div class="color-glass bg-palette-3" @click="playerClickColor(3)"></div>
      <div class="color-glass bg-palette-4" @click="playerClickColor(4)"></div>
      <div class="color-glass bg-palette-5" @click="playerClickColor(5)"></div>
      <div class="color-glass bg-palette-6" @click="playerClickColor(6)"></div>
      <div class="color-glass glass-remove" @click="playerClickRemove()"></div>
      <div class="color-glass glass-save" @click="playerClickSave()"></div>
    </div>
    <div class="player-bet" :class="!roundIsStart ? 'active' : ''">
      <div class="amount-bet">
        {{ getPlayerBet }}€
      </div>
      <div class="bj-token" :class="getPlayerMoney < 1 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(1)">1€</div></div>
      <div class="bj-token" :class="getPlayerMoney < 5 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(5)">5€</div></div>
      <div class="bj-token" :class="getPlayerMoney < 10 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(10)">10€</div></div>
      <div class="bj-token" :class="getPlayerMoney < 50 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(50)">50€</div></div>
    </div>
  </section>
</template>

<script>
import masterSet from "./master-set.vue";
import { MasterMind } from "../../../assets/js/mastermind";

export default {
  name: "MasterTable",
  components: {
    masterSet,
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
    statistics: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      masterMind: {},
      userSet: {},
    };
  },
  created() {
    this.restartBj();
  },
  methods: {
    async restartBj() {
      this.gameResult = null;
      this.isGameRestarting = false;
      this.masterMind = new MasterMind(this.player);
      this.userSet.playerBet = 0;
    },
    async startBj() {
      this.masterMind.isStart = true;
      this.masterMind.isActive = true;
    },
    addBet(value) {
      if (this.player.money >= value) {
        this.player.money -= value;
        this.userSet.playerBet += value;
      }
    },
    async playerClickColor(event) {
      if (!this.masterMind.isActive) {
        return;
      }
      this.masterMind.addColorLine(event);
      console.log(this.masterMind);
    },
    async playerClickRemove() {
      if (!this.masterMind.isActive) {
        return;
      }
      this.masterMind.removeColorLine();
    },
    async playerClickSave() {
      if (!this.masterMind.isActive) {
        return;
      }
      this.masterMind.indexLines++;
    }
  },
  computed: {
    playerIsActive() {
      if (this.masterMind.isActive) {
        return true;
      }
    },
    roundIsStart() {
      return this.masterMind.isStart;
    },
    getPlayerBet() {
      return this.userSet.playerBet;
    },
    getPlayerMoney() {
      return this.player.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  }
};
</script>
