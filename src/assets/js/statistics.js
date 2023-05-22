import { defaultMoney } from "./utils";
const firstStat = {
    money: defaultMoney,
    playerScore: 0,
    game: "start",
};

export class Statistics {
    constructor() {
        this.table = [firstStat];
        this.getCookie();
    }

    getCookie() {
        const localStats = JSON.parse(localStorage.getItem('statistics'));
        if (localStats) {
            this.table = localStats.table;
        }
    }

    resetCookie() {
        localStorage.removeItem('statistics');
        this.table = [firstStat];
    }

    setCookie() {
        if (!this.isAcceptCookie()) {
            return;
        }
        localStorage.setItem('statistics', JSON.stringify(this));
        this.getCookie();
    }

    addStatistic(statObject) {
        this.table.push(statObject);
        this.table.slice(-20);
        this.setCookie();
    }

    isAcceptCookie() {
        return localStorage.getItem('vue-cookie-accept-decline-myPanel1') === 'accept';
    }
}