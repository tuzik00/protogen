const {
    currentDir,
} = require('./utils');


const imageName = 'citilink/docker-protoc';

const pullCommand = `docker pull ${imageName}`;

const runCommand = (file) => `docker run --rm \
    -v ${currentDir()}:/data \
    ${imageName} \
    protoc \
        -I=/data ${file} \
        --js_out=import_style=commonjs:/data \
        --grpc-web_out=import_style=commonjs,mode=grpcwebtext:/data
`;


module.exports = {
    imageName,
    pullCommand,
    runCommand,
};