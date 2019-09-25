const fs = require('fs');
const path = require('path');
const process = require('process');
const childProcess = require('child_process');
const cliProgress = require('cli-progress');


function exec(execute) {
    return new Promise((resolve, reject) => {
        childProcess.exec(execute, (error, stdout, stderr) => {
            if (error) {
                return reject(stderr);
            }

            resolve(stdout);
        })
    });
}

function filterProtoFiles(files) {
    return files.map((file) => {
        if (path.extname(file) !== '.proto') {
            return false;
        }

        return file;
    }).filter(Boolean);
}

function readFiles(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                return reject(err);
            }

            resolve(files);
        });
    })
}

function currentDir() {
    return process.cwd();
}

function progressBar(){
    return new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
}

function isDocker(){
    return exec('docker -v');
}


module.exports = {
    isDocker,
    progressBar,
    currentDir,
    exec,
    filterProtoFiles,
    readFiles,
};

