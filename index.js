#!/usr/bin/env node

// Require the Lodash.debounce module
const debounce = require("lodash-debounce");

// Require the Chokidar module
const chokidar = require("chokidar");

// Add a debounce function to the add event, in order to counteract the chokidar initial file observation, which triggered the add event for each existing file
const startProgram = debounce(() => {
    console.log("A file has been added!");
}, 100);

chokidar.watch(".")
    .on("add", startProgram)
    .on("change", () => {
        console.log("The file has been changed!");
    })
    .on("unlink", () => {
        console.log("A file has been unlinked!");
    });