#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 7000);
    });
};
let animationTitle = chalkAnimation.karaoke('W31c0m3 70 7h3 3n1gm4 Num83r Gu3551ng Ch4113ng3!!!');
await sleep();
animationTitle.stop();
console.log(chalk.green(`
    +---+---+---+---+---+---+---+---+---+---+     |===>>  geT a HiNt?? 🤔
    | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 |  ==> GuEsS a nUmBeR... 😺
    +---+---+---+---+---+---+---+---+---+---+         |===>>> pLaY aGaIn!! 🔄
  
    𝕬𝖗𝖊 𝖞𝖔𝖚 𝖗𝖊𝖆𝖉𝖞 𝖙𝖔 𝖕𝖚𝖙 𝖞𝖔𝖚𝖗 𝖓𝖚𝖒𝖊𝖗𝖎𝖈𝖆𝖑 𝖕𝖗𝖔𝖜𝖊𝖘𝖘 𝖙𝖔 𝖙𝖍𝖊 𝖙𝖊𝖘𝖙? 𝖑𝖊𝖙𝖘 𝖉𝖊𝖑𝖛𝖊 𝖎𝖓𝖙𝖔 𝖙𝖍𝖊 𝖊𝖓𝖎𝖌𝖒𝖆...
  `));
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function game() {
    let playAgain = true;
    while (playAgain) {
        let { maxNumber, numPlayers } = await inquirer.prompt([
            {
                type: 'number',
                name: 'maxNumber',
                message: 'Enter the maximum number to guess:\n',
            },
            {
                type: 'number',
                name: 'numPlayers',
                message: 'Enter the number of players:\n',
            },
        ]);
        if (numPlayers === 0) {
            console.log(chalk.yellow('No players. Exiting the game.'));
            break;
        }
        let leaderboard = [];
        let currentPlayer = 1;
        while (true) {
            let secretNumber = generateRandomNumber(1, maxNumber);
            let attempts = 0;
            let hintGiven = false;
            console.log(chalk.blue(`Player ${currentPlayer}, it's your turn to guess!`));
            let { guess } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'guess',
                    message: 'Guess a number:\n',
                },
            ]);
            while (guess !== secretNumber) {
                attempts++;
                if (guess < secretNumber) {
                    console.log(chalk.red('Your guess is lower than the actual number...'));
                }
                else {
                    console.log(chalk.magenta('Your guess is higher than the actual number...'));
                }
                if (!hintGiven) {
                    let { hint } = await inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'hint',
                            message: 'Would you like a hint? (Yes/No)\n',
                        },
                    ]);
                    if (hint) {
                        const hintMessage = secretNumber % 2 === 0 ? 'The secret number is even.' : 'The secret number is odd.';
                        console.log(chalk.black(`Hint: ${hintMessage}`));
                        hintGiven = true;
                    }
                }
                guess = (await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'guess',
                        message: 'Guess again:\n',
                    },
                ])).guess;
            }
            attempts++;
            console.log(chalk.green(`\nCongratulations, Player ${currentPlayer}! You guessed the actual number!`));
            console.log(chalk.magenta(`Number of attempts: ${attempts}`));
            leaderboard.push({ player: currentPlayer, attempts });
            currentPlayer++;
            if (currentPlayer > numPlayers) {
                break;
            }
        }
        let { showLeaderboard } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'showLeaderboard',
                message: 'Do you want to see the leaderboard? (Yes/No)\n',
            },
        ]);
        if (showLeaderboard) {
            console.log(chalk.yellow('\nLeaderboard:'));
            leaderboard.forEach((entry) => {
                console.log(chalk.black(`Player ${entry.player}: ${entry.attempts} attempts`));
            });
        }
        let { playAgainAnswer } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'playAgainAnswer',
                message: 'Do you want to play again? (Yes/No)\n',
            },
        ]);
        playAgain = playAgainAnswer;
    }
    console.log(chalk.magenta('ƓąⱮҽ ටѵƐɾ... Thank you for embarking on the Enigma Number Guessing Challenge!!...'));
}
game();
