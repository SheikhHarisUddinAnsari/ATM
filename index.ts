#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let welcome = `Welcome To Zia Bank`;
console.log(chalk.magentaBright(welcome));
class data {
  id: string;
  pin: string;
  money: number;
  constructor(id: string, pin: string) {
    this.id = id;
    this.pin = pin;
    this.money = Math.floor(Math.random() * 1000000);
  }
} //This class is like blue print which I have further used to project objects

const user1 = new data(`Haris`, `haris123`);
const user2 = new data(`Usman`, `usman123`);
const user3 = new data(`Ali`, `ali123`);
const user4 = new data(`Zamzam`, `zamzam123`);
let ID;
let PIN;
const id = await inquirer
  .prompt([
    {
      type: `string`,
      name: `id`,
      message: `Enter User ID`,
    },
  ])
  .then((ans) => {
    ID = ans.id;
  }); //This const asks for id and stores it in ID

const pin = await inquirer
  .prompt([
    {
      type: `string`,
      name: `pin`,
      message: `Enter User PIN`,
    },
  ])
  .then((ans) => {
    PIN = ans.pin;
  }); //This const asks for pin and stores it in PIN

switch (true) {
  case user1.id === ID && user1.pin === PIN:
    operation(user1);
    break;

  case user2.id === ID && user2.pin === PIN:
    operation(user2);
    break;

  case user3.id === ID && user3.pin === PIN:
    operation(user3);
    break;

  case user4.id === ID && user4.pin === PIN:
    operation(user4);
    break;

  default:
    console.log(chalk.redBright(`Incorrect ID or PIN`));
    break;
} //This switch case checks users ID and their PIN and passes users to operation function if they are correct and stops them if they are incorrect

async function operation(x: data) {
  console.log(chalk.magentaBright(`Assalam o Aleikum ${x.id}`));
  let account: string;
  console.log(chalk.greenBright(`CURRENT BALANCE:${x.money}`));
  await inquirer
    .prompt([
      {
        type: `list`,
        name: `operations`,
        message: `Which function do you want to perform`,
        choices: [`Cash Withdraw`, `Deposit`, `Fund Transfer`, `Bill Payment`],
      },
    ])
    .then((ans) => {
      switch (true) {
        case ans.operations == `Cash Withdraw`:
          inquirer
            .prompt([
              {
                type: `list`,
                name: `withdraw`,
                message: `How much rupees do you want to Withdraw`,
                choices: [500, 1000, 2000, 3000, 4000, 5000, 10000],
              },
            ])
            .then((ans) => {
              console.log(
                chalk.redBright(
                  `Successfully Withdrew Rs${ans.withdraw} Amount Of Money`
                )
              );
              console.log(
                chalk.greenBright(
                  `After Withdraw BALANCE: ${x.money - ans.withdraw}`
                )
              );
            });
          break;
        case ans.operations == `Deposit`:
          inquirer
            .prompt([
              {
                type: `list`,
                name: `deposit`,
                message: `How much rupees do you want to deposit`,
                choices: [500, 1000, 2000, 3000, 4000, 5000, 10000],
              },
            ])
            .then((ans) => {
              console.log(
                chalk.redBright(
                  `Successfully Deposited Rs${ans.deposit} Amount Of Money`
                )
              );
              console.log(
                chalk.greenBright(
                  `After Deposit BALANCE: ${x.money + ans.deposit}`
                )
              );
            });
          break;
        case ans.operations == `Fund Transfer`:
          {
            inquirer
              .prompt([
                {
                  type: `list`,
                  name: `transfer`,
                  message: `How much rupees do you want to transfer`,
                  choices: [500, 1000, 2000, 3000, 4000, 5000, 10000],
                },
              ])

              .then((ans) => {
                console.log(
                  chalk.redBright(
                    `Successfully Transferred Rs${ans.transfer} Amount Of Money to Sylani Welfare Trust`
                  )
                );
                console.log(
                  chalk.greenBright(
                    `After Transfer BALANCE: ${x.money - ans.transfer}`
                  )
                );
              });
          }
          break;
        case ans.operations == `Bill Payment`:
          {
            const bills = [10000, 500, 200];
            inquirer
              .prompt([
                {
                  type: `list`,
                  name: `bills`,
                  message: `Which bill do you want to pay`,
                  choices: [`Electricity`, `Gas`, `Utility`],
                },
              ])

              .then((ans) => {
                switch (true) {
                  case ans.bills == `Electricity`:
                    console.log(
                      chalk.redBright(
                        `Rs ${bills[0]} has been paid in ${ans.bills} bill`
                      )
                    );
                    console.log(
                      chalk.greenBright(
                        `After Bill Payment BALANCE: ${x.money - bills[0]}`
                      )
                    );
                    break;

                  case ans.bills == `Gas`:
                    console.log(
                      chalk.redBright(
                        `Rs ${bills[1]} has been paid in ${ans.bills} bill`
                      )
                    );
                    console.log(
                      chalk.greenBright(
                        `After Bill Payment BALANCE: ${x.money - bills[1]}`
                      )
                    );
                    break;
                  case ans.bills == `Utility`:
                    console.log(
                      chalk.redBright(
                        `Rs ${bills[2]} has been paid in ${ans.bills} bill`
                      )
                    );
                    console.log(
                      chalk.greenBright(
                        `After Bill Payment BALANCE: ${x.money - bills[2]}`
                      )
                    );
                    break;
                }
              });
          }
          break;
        default:
          console.log(`statement did not execute`);
          console.log(ans.operations);
          break;
      }
    });
} //The operation function performs all the functions on the user's account
