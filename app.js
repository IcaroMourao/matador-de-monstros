new Vue({
  el: '#app',
  data: {
    playerName: 'Jogador',
    monsterName: 'Monstro',
    playerLife: 100,
    monsterLife: 100,
    start: true,
    logs: [],
    maxDemage: 15,
    minDemage: 7,
    maxHeal: 14,
    minHeal: 8,
  },
  methods: {
    startGame() {
      this.start = false;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },
    attack(special) {
      const playerDemage =
        this.randomNumberBetween(
          this.minDemage,
          this.maxDemage
        );

      var monsterDemage =
        this.randomNumberBetween(
          this.minDemage,
          this.maxDemage
        );

      if (special) monsterDemage += 2;

      this.computeAction(playerDemage, monsterDemage, null);
      this.savePlayerAttack(playerDemage);
      this.saveMonsterAttack(monsterDemage);
    },
    specialAttack() {
      this.attack(true);
    },
    heal() {
      const playerHeal =
        this.randomNumberBetween(
          this.minHeal,
          this.maxHeal
        );

      const playerDemage =
        this.randomNumberBetween(
          this.minDemage,
          this.maxDemage
        );

      this.computeAction(playerDemage, null, playerHeal);
      this.saveHeal(playerHeal);
      this.savePlayerAttack(playerDemage);
    },
    giveUp() {
      this.playerLife = 100;
      this.monsterLife = 100;
      this.start = true;
      this.logs = [];
    },
    randomNumberBetween(min, max) {
      return (Math.floor(Math.random() * (max - min)) + min);
    },
    savePlayerAttack(playerDemage) {
      this.logs.push({
        demage: playerDemage,
        monsterAttack: true,
      });
    },
    saveMonsterAttack(monsterDemage) {
      this.logs.push({
        demage: monsterDemage,
        playerAttack: true,
      });
    },
    saveHeal(playerHeal) {
      this.logs.push({
        heal: playerHeal,
        isHeal: true,
      });
    },
    computeAction(playerDemage, monsterDemage, playerHeal) {
      if(playerDemage && this.monsterLife > 0) {
        if(this.playerLife >= playerDemage) {
          this.playerLife -= playerDemage;
        } else {
          this.playerLife -= this.playerLife
        }
      }
      if(monsterDemage && this.playerLife > 0) {
        if(this.monsterLife >= monsterDemage) {
          this.monsterLife -= monsterDemage;
        } else {
          this.monsterLife -= this.monsterLife
        }
      }
      if(playerHeal) {
        if(this.playerLife + playerHeal <= 100 ) {
          this.playerLife += playerHeal;
        } else {
          this.playerLife = 100;
        }
      }
    },
  },
});
