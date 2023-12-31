// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Hero.sol";

contract Mage is Hero(50) {
    function attack(address enemy) public override {
        Enemy enemyContract = Enemy(enemy);
        enemyContract.takeAttack(Hero.AttackTypes.Spell);

        super.attack(enemy);
    }
}

contract Warrior is Hero(200) {
    function attack(address enemy) public override {
        Enemy enemyContract = Enemy(enemy);
        enemyContract.takeAttack(Hero.AttackTypes.Brawl);

        super.attack(enemy);
    }
}