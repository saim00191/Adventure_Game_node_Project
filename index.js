#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Advanture Game
class Player {
    name;
    Health = 100;
    HealthDecrease() {
        let Health = this.Health - 25;
        this.Health = Health;
    }
    HealthIncrease() {
        this.Health = 100;
    }
    constructor(name) {
        this.name = name;
    }
}
class Opponent {
    name;
    Health = 100;
    HealthDecrease() {
        let Health = this.Health - 25;
        this.Health = Health;
    }
    constructor(name) {
        this.name = name;
    }
}
const playerName = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "Enter your name: ",
        validate: function (value) {
            if (value.length < 3) {
                return "Please Enter Valid Name";
            }
            else if (!isNaN(value)) {
                return "Please Enter Valid Name";
            }
            else {
                return true;
            }
        }
    }
]);
const opponentName = await inquirer.prompt([
    {
        type: "list",
        name: "opponent",
        message: "Select your opponent: ",
        choices: ["Skeleton", "Assasin", "Zombie"]
    }
]);
const player = new Player(playerName.name);
const opponent = new Opponent(opponentName.opponent);
console.log(`\n\t${chalk.bold.green(player.name.toUpperCase())} ${chalk.yellow.bold("VS")} ${chalk.red.bold(opponent.name.toUpperCase())}\n`);
while (true) {
    let game = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Select your action: ",
            choices: ["Attack", "Drink", "Run For Life.."]
        }
    ]);
    if (game.action === "Attack") {
        let Number = Math.floor(Math.random() * 2);
        if (Number === 1) {
            player.HealthDecrease();
            console.log((chalk.red.bold(`${player.name} Health is ${player.Health}`)));
            console.log((chalk.green.bold(`${opponent.name} Health is ${opponent.Health}`)));
        }
        if (Number === 0) {
            opponent.HealthDecrease();
            console.log((chalk.green.bold(`${player.name} Health is ${player.Health}`)));
            console.log((chalk.red.bold(`${opponent.name} Health is ${opponent.Health}`)));
        }
        if (player.Health <= 0) {
            console.log(chalk.red.bold(`\nYou Loose. Better Luck Next Time`));
            process.exit();
        }
        if (opponent.Health <= 0) {
            console.log(chalk.green.bold.italic(`\nYou Won!!`));
            process.exit();
        }
    }
    else if (game.action === "Drink") {
        player.HealthIncrease();
        console.log(chalk.green.bold.italic(`You Drink Health Portion . Your Fuel is ${player.Health}`));
    }
    else if (game.action === "Run For Life..") {
        console.log(chalk.red.bold(`\nYou Loose. Better Luck Next Time`));
        process.exit();
    }
}
