<template>
  <section class="master-container" :class="!roundIsStart ? 'end-game' : ''">
    <div class="player-money">
      Solde : {{ getPlayerMoney }}€
    </div>
    <div class="master-table">
      <masterSet v-for="(p, i) in masterMind.linesColors" :values="p" :resultLine="masterMind.resultLine" :isActive="masterMind.indexLines === p.id" />

      <div v-if="getPlayerBet > 0 && !roundIsStart" class="bj-token-container">
        <div class="bj-token">
          <div class="bj-btn" @click="addBet(- masterMind.playerBet)">Cancel</div>
        </div>
        <div class="bj-token">
          <div class="bj-btn" @click="startGame()">Start</div>
        </div>
      </div>

      <div class="player-action order-last" :class="playerIsActive ? 'active' : ''">
        <div class="color-glass bg-palette-1" @click="playerClickColor(1)"></div>
        <div class="color-glass bg-palette-2" @click="playerClickColor(2)"></div>
        <div class="color-glass bg-palette-3" @click="playerClickColor(3)"></div>
        <div class="color-glass bg-palette-4" @click="playerClickColor(4)"></div>
        <div class="color-glass bg-palette-5" @click="playerClickColor(5)"></div>
        <div class="color-glass bg-palette-6" @click="playerClickColor(6)"></div>
        <div class="color-glass glass-remove" @click="playerClickRemove()"></div>
        <div class="color-glass glass-save" @click="playerClickSave()"></div>
      </div>
    </div>
    <div class="player-bet" :class="!roundIsStart ? 'active' : ''">
      <div class="amount-bet">
        {{ getPlayerBet }}€
      </div>
      <div class="bj-token" :class="getPlayerMoney < 50 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(50)">50€</div></div>
      <div class="bj-token" :class="getPlayerMoney < 100 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(100)">100€</div></div>
      <div class="bj-token" :class="getPlayerMoney < 500 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(500)">500€</div></div>
      <div class="bj-token" :class="getPlayerMoney < 1 ? 'disabled' : ''"><div class="bj-btn" @click="addBet(player.money)">ALL</div></div>
    </div>
  </section>
</template>

<script>
import masterSet from "./master-set.vue";
import { MasterMind, numberLines, numberColors } from "../../../assets/js/mastermind";

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
    },
    notificationCenter: {
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
    this.restartGame();
  },
  methods: {
    async restartGame() {
      this.gameResult = null;
      this.isGameRestarting = false;
      this.masterMind = new MasterMind(this.player, this.statistics, this.notificationCenter);
    },
    async startGame() {
      this.masterMind.isStart = true;
      this.masterMind.isActive = true;
      this.masterMind.indexLines = 0;
      this.masterMind.linesColors = this.masterMind.generateLinesColors(numberLines);
      this.masterMind.resultLine = this.masterMind.generateResultLine(numberColors);
    },
    addBet(value) {
      if (this.player.money >= value) {
        this.player.addMoney(- value);
        this.masterMind.playerBet += value;
      }
    },
    async playerClickColor(event) {
      if (!this.masterMind.isActive) {
        return;
      }
      this.masterMind.addColorLine(event);
    },
    async playerClickRemove() {
      if (!this.masterMind.isActive) {
        return;
      }
      this.masterMind.removeColorLine();
    },
    async playerClickSave() {
      if (!this.masterMind.isActive || !this.masterMind.currentLineIsFull()) {
        return;
      }
      if (!this.masterMind.saveColorLine()) {
        this.masterMind.indexLines++;
      }
    }
  },
  computed: {
    playerIsActive() {
      if (this.masterMind.isActive) {
        return true;
      }
    },
    roundIsStart() {
      return this.masterMind.isStart || this.masterMind.isGameRestarting;
    },
    getPlayerBet() {
      return this.masterMind.playerBet;
    },
    getPlayerMoney() {
      return this.player.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  }
};
</script>
