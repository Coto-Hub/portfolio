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
        <input class="login-btn" type="submit" value="Enregistrer" />
      </form>
    </div>

    <div class="account-info" :class="player.isStorage ? 'z-10' : ''">
      <div class="account-chart">
        <p class="coming-soon active">Statistique à venir</p>
      </div>
      <form @submit.prevent="resetPlayer" class="reset-form">
        <ul class="account-money">
          <li><span>Solde actuel:</span> {{ formatMoney(player.money) }} €</li>
          <li><span>Solde record:</span> {{ formatMoney(player.highScore) }} €</li>
        </ul>
        <input class="login-btn" type="submit" value="Supprimer" />
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
      return {
        isLoading: false,
      };
    },
    created() {},
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
    },
    computed: {
      formatMoney() {
        return money => money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      },
      canLoginWithCookie() {
        return localStorage.getItem('vue-cookie-accept-decline-myPanel1') === 'accept';
      }
    }
};
</script>
  