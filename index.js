#!/usr/bin/env node

const task = process.argv.slice(2);


switch (task[0]) {
    default:
        require('./scripts/build');
}