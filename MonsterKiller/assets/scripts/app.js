const ATTACK_VALUE = 10;
const STRONG_ATTACK = 18;
const MONSTER_ATTACK = 15;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_PLAYER_ATTACK = "PLAYER ATTACK";
const LOG_PLAYER_STRONG_ATTACK = "PLAYER STRONG ATTACK";
const LOG_MONSTER_ATTACK = "MONSTER ATTACK";
const LOG_PLAYER_HEAL = "PLAYER HEAL";
const LOG_GAME_OVER = "GAME OVER";

let battleLog = [];

function getMaxLifeFromUser(){
  const userInput = prompt("Specify the Maximum Life", "100");

  let parsedValue = parseInt(userInput);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw {message : "Error : Life must be a number..!"}
  }
  return parsedValue;
}

let maxLife;
try{
  maxLife = getMaxLifeFromUser();
} catch (error){
  console.log(error.message);
  maxLife = 100;
}

let curMonsterLife = maxLife;
let curPlayerLife = maxLife;
let hasBonusLife = true;

adjustHealthBars(maxLife);

function createLogEvent(event, value, monsterHealth, playerHealth, target) {
  return {
    event: event,
    value: value,
    target: target,
    monsterHealth: monsterHealth,
    playerHealth: playerHealth,
  };
}

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry;
  let target;
  switch (event) {
    case LOG_PLAYER_ATTACK:
      target = "Monster";
      break;
    case LOG_PLAYER_STRONG_ATTACK:
      target = "Monster";
      break;
    case LOG_MONSTER_ATTACK:
      target = "Player";
      break;
    case LOG_PLAYER_HEAL:
      target = "Player";
      break;
    case LOG_GAME_OVER:
      target = "None";
      break;
  }
  logEntry = createLogEvent(event, value, monsterHealth, playerHealth, target);
  battleLog.push(logEntry);
}

function reset() {
  curMonsterLife = maxLife;
  curPlayerLife = maxLife;
  resetGame(maxLife);
}

function endRound() {
  const backupPlayerHealth = curPlayerLife;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
  curPlayerLife -= playerDamage;
  writeToLog(LOG_MONSTER_ATTACK, playerDamage, curMonsterLife, curPlayerLife);

  if (curPlayerLife <= 0 && hasBonusLife) {
    hasBonusLife = false;
    curPlayerLife = backupPlayerHealth;
    removeBonusLife();
    setPlayerHealth(curPlayerLife);
    alert("Bonus Life Utilized..!");
  }

  let gameStatus = "";
  if (curMonsterLife <= 0 && curPlayerLife > 0) {
    alert("Victory....!");
    gameStatus = "Player Won";
  } else if (curPlayerLife <= 0 && curMonsterLife > 0) {
    alert("You Lose...!");
    gameStatus = "Monster Won";
  } else if (curMonsterLife <= 0 && curPlayerLife <= 0) {
    alert("Match Draw..!");
    gameStatus = "Match Draw";
  }

  if (curPlayerLife <= 0 || curMonsterLife <= 0) {
    writeToLog(LOG_GAME_OVER, gameStatus, curMonsterLife, curPlayerLife);
    reset();
  }
}

function attack(attackMode) {
  let logMode = LOG_PLAYER_ATTACK;
  let attackValue = ATTACK_VALUE;
  if (attackMode === MODE_STRONG_ATTACK) {
    attackValue = STRONG_ATTACK;
    logMode = LOG_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(attackValue);
  curMonsterLife -= damage;
  writeToLog(logMode, damage, curMonsterLife, curPlayerLife);
  endRound();
}

function attackHandler() {
  attack(MODE_ATTACK);
}

function strongAttackHandler() {
  attack(MODE_STRONG_ATTACK);
}

function healHandler() {
  let healValue = HEAL_VALUE;
  if (curPlayerLife + healValue >= maxLife) {
    alert("You can heal only upto the Max Limit..!");
    healValue = maxLife - curPlayerLife;
  }
  increasePlayerHealth(healValue);
  curPlayerLife += healValue;
  writeToLog(LOG_PLAYER_HEAL, healValue, curMonsterLife, curPlayerLife);
  endRound();
}

function logHandler() {
  for (const entry of battleLog){
    console.log("\n");
    for (const key in entry){
      console.log(key + " : " + entry[key] + "\n");
    }
    console.log("************************")
  }
  
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", logHandler);
