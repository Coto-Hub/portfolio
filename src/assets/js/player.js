export class Player {
    constructor(money) {
        this.isStorage = false;
        this.reset = false;
        this.money = money;
        this.highScore = 0;
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

    setCookie() {
        if (localStorage.getItem('vue-cookie-accept-decline-myPanel1') === 'accept') {
            localStorage.setItem('player', JSON.stringify(this));
        }
    }
}