#!/usr/vin/env node

/**
  ___               _     
 / _ \             (_)    
/ /_\ \_ __  _ __   _ ___ 
|  _  | '_ \| '_ \ | / __|
| | | | |_) | |_) || \__ \
\_| |_/ .__/| .__(_) |___/
      | |   | |   _/ |    
      |_|   |_|  |__/     
 */

const { Client } = require('pg');
const inquirer = require('inquirer');
const { config } = require('./database/config.js');
const database = require('./database/database');        
const client = new Client(config.db);

const fs = require('fs');
const Book = require("./database/classes/Book");

/**
 * @notes For the database builder to work. It's assumed that you 
 * have an already created database under the name of vain. If you 
 * want the database to be created elsewhere, change the config 
 * file database name. 
 * 
 * @path ./database/database.js
 */
const App = async () => {
    await client.connect();
    const pgdb = new database.Database(client);
    await pgdb.deleteTables();
    await pgdb.createDatabases();
    await pgdb.populateDatabase();
    await pgdb.readFile('vain.tsv');
    await pgdb.insertIntoDatabase('vain.json')
    await pgdb.closeDatabase();
    // const action = await inquirer.prompt({
    //     name: "userAction",
    //     type: "list",
    //     message: "What would you like to do: \n",
    //     choices: [
    //         "Drop Database.",
    //         "Create Database.",
    //         "Recreate Database.",
    //         "Read a file."
    //     ]
    // });
    // if (action.userAction === "Drop Database."){
    //     await pgdb.deleteTables();
    //     console.log("\nAll tables dropped!")
    // }
    // if (action.userAction === "Create Database."){
    //     await pgdb.createDatabases();
    //     await pgdb.populateDatabase();
    //     console.log("\nDatabase Created!")
    // }
    // if (action.userAction === "Recreate Database."){
    //     await pgdb.deleteTables();
    //     await pgdb.createDatabases();
    //     await pgdb.populateDatabase();
    //     console.log("\nDatabase dropped and recreated!")
    // }
    // if (action.userAction === "Read a file."){
    //     console.log('running reading file')
    //     await pgdb.readFile('data/input/vain.tsv')
    // }
};

App();