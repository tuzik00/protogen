const chalk = require('chalk');

const {
    filterProtoFiles,
    currentDir,
    readFiles,
    exec,
    progressBar,
    isDocker,
} = require('../utils');

const {
    pullCommand,
    runCommand,
    imageName,
} = require('../config');


const buildProgress = progressBar();
const dockerPullProgress = progressBar();


isDocker()
    .then(() => {
        console.log(chalk.green(` 1/2 Docker pull ${imageName}:`));
        dockerPullProgress.start(1, 0);
    })
    .then(() => exec(pullCommand))
    .then(() => dockerPullProgress.increment())
    .then(() => readFiles(currentDir()))
    .then(filterProtoFiles)
    .then((files) => {
        console.log(chalk.green('\n 2/2 Build:'));
        buildProgress.start(files.length, 0);

        const promises = files.map((file) => {
            return exec(runCommand(file))
                .then(() => {
                    buildProgress.increment();
                });
        });

        return Promise.all(promises);
    })
    .then(() => {
        buildProgress.stop();
        dockerPullProgress.stop();
        console.log(chalk.green(' Build complete'));
    })
    .catch((e) => {
        console.log(chalk.red('\n Failed to compile.'));
        console.log(e);
        process.exit(1)
    });
