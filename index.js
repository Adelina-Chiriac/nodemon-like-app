#!/usr/bin/env node

// Require the Lodash.debounce module
const debounce = require("lodash-debounce");

// Require the Chokidar module
const chokidar = require("chokidar");

chokidar.watch(".")
    .on("add", () => {
        console.log("A file has been added!");
    })
    .on("change", () => {
        console.log("The file has been changed!");
    })
    .on("unlink", () => {
        console.log("A file has been unlinked!");
    });