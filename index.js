#!/usr/bin/env node

// Require the Lodash.debounce module
const debounce = require("lodash.debounce");

// Require the Chokidar module
const chokidar = require("chokidar");

// Require the Caporal module
const program = require("caporal");

// Require the File System module
const fs = require("fs");

// Require the Child Processes module
const { spawn } = require("child_process");

program
    .version("0.0.1")
    .argument("[filename]", "Name of a file to execute")
    .action(async (args) => {
        // Destructure the args object to extract the filename
        const { filename } = args;

        // Check to see if the user provided a filename in the arguments, and if not, default to index.js
        const name = filename || "index.js";

        // Check to see if this filename actually exists
        try {
            await fs.promises.access(name);
        }
        catch (err) {
            throw new Error(`The file ${name} could not be found!`);
        }

        // Add a debounce function to the add event, in order to counteract the chokidar initial file observation, which triggered the add event for each existing file
        const startProgram = debounce(() => {
            spawn("node", [name], { stdio: "inherit" })
        }, 100);

        chokidar.watch(".")
            .on("add", startProgram)
            .on("change", startProgram)
            .on("unlink", startProgram);
    });

program.parse(process.argv);

