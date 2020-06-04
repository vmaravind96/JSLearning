const ATTACK_VALUE = 10;
const STRONG_ATTACK = 18;
const MONSTER_ATTACK = 15;
const HEAL_VALUE = 20;

const userInput = prompt("Specify the Maximum Life", "100");

let maxLife = parseInt(userInput);
if (isNaN(maxLife) || maxLife <= 0){
    maxLife = 100;
}
let curMonsterLife = maxLife;
let curPlayerLife = maxLife;
let hasBonusLife = true;

adjustHealthBars(maxLife);

function reset() {
  curMonsterLife = maxLife;
  curPlayerLife = maxLife;
  resetGame(maxLife);
}

function endRound() {
  const backupPlayerHealth = curPlayerLife;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
  curPlayerLife -= playerDamage;

  if (curPlayerLife <= 0 && hasBonusLife) {
    hasBonusLife = false;
    curPlayerLife = backupPlayerHealth;
    removeBonusLife();
    setPlayerHealth(curPlayerLife);
    alert("Bonus Life Utilized..!");
  }

  if (curMonsterLife <= 0 && curPlayerLife > 0) {
    alert("Victory....!");
  } else if (curPlayerLife <= 0 && curMonsterLife > 0) {
    alert("You Lose...!");
  } else if (curMonsterLife <= 0 && curPlayerLife <= 0) {
    alert("Match Draw..!");
  }

  if (curPlayerLife<=0 || curMonsterLife<=0){
      reset();
  }
}

function attack(attackMode) {
  let attackValue = ATTACK_VALUE;
  if (attackMode === "STRONG") {
    attackValue = STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(attackValue);
  curMonsterLife -= damage;
  endRound();
}

function attackHandler() {
  attack("NORMAL");
}

function strongAttackHandler() {
  attack("STRONG");
}

function healHandler() {
  let healValue = HEAL_VALUE;
  if (curPlayerLife + healValue >= maxLife) {
    alert("You can heal only upto the Max Limit..!");
    healValue = maxLife - curPlayerLife;
  }
  increasePlayerHealth(healValue);
  curPlayerLife += healValue;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
