#!/usr/bin/env node

// Require the Lodash.debounce module
const debounce = require("lodash.debounce");

// Require the Chokidar module
const chokidar = require("chokidar");

// Require the Caporal module
const program = require("caporal");

program
    .version("0.0.1")
    .argument("[filename]", "Name of a file to execute")
    .action((args) => {
        // Add a debounce function to the add event, in order to counteract the chokidar initial file observation, which triggered the add event for each existing file
        const startProgram = debounce(() => {
            console.log("A file has been added!");
        }, 100);

        chokidar.watch(".")
            .on("add", startProgram)
            .on("change", startProgram)
            .on("unlink", startProgram);
    });

program.parse(process.argv);

