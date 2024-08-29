import { defaultMoney } from "./utils";

export class Player {
    constructor() {
        this.isStorage = false;
        this.money = defaultMoney;
        this.highScore = defaultMoney;
        this.username = '';
        this.getCookie();
    }

    getCookie() {
        const localPlayer = JSON.parse(localStorage.getItem('player'));
        this.money = localPlayer ? localPlayer.money : this.money;
        this.username = localPlayer ? localPlayer.username : this.username;
        this.highScore = localPlayer ? localPlayer.highScore : this.highScore;
        this.isStorage = Boolean(localPlayer);
    }

    resetCookie() {
        localStorage.removeItem('player');
        this.isStorage = false;
        this.money = defaultMoney;
        this.highScore = 0;
        this.username = '';
    }

    setCookie() {
        if (!this.isAcceptCookie()) {
            return;
        }
        localStorage.setItem('player', JSON.stringify(this));
        this.getCookie();
    }

    isAcceptCookie() {
        return localStorage.getItem('vue-cookie-accept-decline-myPanel1') === 'accept';
    }

    addMoney(value) {
        this.money += value;

        if (this.money > this.highScore) {
            this.highScore = this.money;
        }
        this.setCookie();
    }
}