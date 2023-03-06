export class Player {
    constructor(money) {
        this.money = money;
        this.getCookieMoney();
    }

    getCookieMoney() {
        this.money = localStorage.money ? localStorage.money : this.money;
    }
}