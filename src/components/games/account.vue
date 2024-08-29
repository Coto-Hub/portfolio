<template>
  <fieldset class="account-container" v-if="canLoginWithCookie">
    <legend class="account-title">
      <span class="login" v-if="!player.isStorage">Login</span>
      <span class="loged" v-else>{{ player.username }}</span>

      <div class="title-loading" v-if="isLoading">
        <waitSvg />
      </div>
    </legend>

    <div class="account-login" :class="!player.isStorage ? 'z-10' : ''">
      <form @submit.prevent="savePlayer" class="login-form">
        <input class="login-input" type="text" v-model="player.username" placeholder="Pseudo :" required>
        <input class="login-btn" type="submit" value="Se connecter" />
      </form>
    </div>

    <div class="account-info" :class="player.isStorage ? 'z-10' : ''">
      <div class="account-chart">
        <apexchart type="line" :options="chartOptions" :series="getStatsSeries"></apexchart>
        <p class="coming-soon" :class="!statistics.table.length ? 'active' : ''">Statistiques à venir</p>
      </div>
      <form @submit.prevent="resetPlayer" class="reset-form">
        <ul class="account-money">
          <li><span>Solde actuel:</span> {{ formatMoney(player.money) }} €</li>
          <li><span>Solde record:</span> {{ formatMoney(player.highScore) }} €</li>
        </ul>
        <input class="login-btn" type="submit" value="Réinitialiser" />
      </form>
    </div>

    <div class="account-loading" v-if="isLoading">
      <waitSvg />
    </div>
  </fieldset>
</template>

<script>
import { defaultMoney } from "../../assets/js/utils";
import waitSvg from "../svg/wait.vue";

export default {
  name: "Account",
  components: {
    waitSvg,
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
    var self = this;
    return {
      isLoading: false,
      chartOptions: {
        chart: { width: "100%", type: 'line', zoom: { enabled: false } },
        dataLabels: { enabled: false },
        stroke: { curve: 'straight' },
        xaxis: { labels: { show: false }, tooltip: { enabled: false } },
        yaxis: {
          labels: {
            show: true,
            style: { cssClass: 'apexchart-yaxis' },
          }
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

            const balance = `<li>Solde: ${self.format(data.y)} €</li>`;
            const gap = data.gap ? `<li>Différence: ${self.format(data.gap)} €</li>` : '';
            const concat = [balance, gap].filter(Boolean).join('');

            return `
              <ul class="custom-tooltip">${concat}</ul>`;
          }
        }
      },
    };
  },
  created() { },
  methods: {
    savePlayer() {
      this.isLoading = true;
      this.player.money = this.player.highScore = defaultMoney;
      this.player.setCookie();
      this.statistics.setCookie();
      setTimeout(() => this.isLoading = false, 500);
    },
    resetPlayer() {
      this.isLoading = true;
      this.player.resetCookie();
      this.statistics.resetCookie();
      setTimeout(() => this.isLoading = false, 500);
    },
    format(money) {
      return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  computed: {
    formatMoney() {
      return money => this.format(money);
    },
    canLoginWithCookie() {
      return false; //localStorage.getItem('vue-cookie-accept-decline-myPanel1') === 'accept';
    },
    getStatsSeries() {
      if (!this.statistics.table.length)
        return [];

      const formatedData = [];
      this.statistics.table.forEach((element, index) => {
        formatedData.push({
          x: index + 1,
          y: element.money,
          gap: element.playerScore,
        });
      });
      return [{
        name: "Argent",
        data: formatedData
      }];
    }
  }
};
</script>