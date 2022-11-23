#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
let yourName;
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const welcome = async () => {
    const rainbowTitle = chalkAnimation.rainbow("Welcome To My Smart Number Guess Game!\nCreated by Adeel Talib");
    await sleep();
    rainbowTitle.stop();
    console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    1. You need to Guess a number between 1 to 100.
    2. If you guess lower number you will be inform, then you can enter another higher number.
    3. If you guess higher number you will be inform, then you can enter lower number.
    4. ${chalk.bgRed("If you guess correct, Congradulations!")}    
  `);
};
async function yName() {
    const answers = await inquirer.prompt({
        name: "yourName",
        type: "input",
        message: "What is your name? ",
        default() {
            return "Name:";
        },
    });
    yourName = answers.yourName.toUpperCase();
}
console.clear();
await welcome();
await yName();
let game;
do {
    let n = Math.floor(Math.random() * 100 + 1);
    let win = 0;
    async function numberGuess() {
        do {
            const questions = [
                {
                    type: "input",
                    name: "numberGuess",
                    message: chalk.greenBright("Please Guess The Number: "),
                },
            ];
            await inquirer.prompt(questions).then(function (answers) {
                if (answers.numberGuess > n)
                    console.log(chalk.yellowBright(`${yourName}, You Guessed Higher Number, Please Guess Again...`));
                else if (answers.numberGuess < n) {
                    console.log(chalk.yellowBright(`${yourName}, You Guessed Lower Number, Please Guess Again...`));
                }
                else {
                    console.log(chalk.bgRedBright(`${yourName}, Congradulations! You Guessed The Correct Number`));
                    win = 1;
                }
            });
        } while (win !== 1);
    }
    // const manageAnswer = async (game: number) =>
    // {
    //     const spinner = createSpinner('Calculating...').start();
    //     await sleep();
    //     if(game < rNumber)
    //     {
    //         spinner.success({ text: `${yourName} You Guessed Lower Number` });
    //     }
    //             else if(game > rNumber)
    //     {
    //         spinner.success({ text: `${yourName} You Guessed Higher Number` });
    //     }
    //             else if(game === rNumber)
    //     {
    //         spinner.success({ text: `${yourName} Congradulations! You Guessed The Correct Number` });
    //     }
    // }
    const restart = async () => {
        const again = await inquirer.prompt({
            name: "restart",
            type: "rawlist",
            message: chalk.magentaBright("Do you want to Play again? Enter 1 for Yes and 2 for No."),
            choices: ["Yes", "No"],
        });
        game = again.restart;
    };
    //await question();
    await numberGuess();
    await restart();
    console.clear();
} while (game === "Yes");
