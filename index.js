`#!/usr/bin/env node`
const mdLinks= require('./md-links.js');


const getCommandInPosition = (pos) => {
  return (process.argv[pos]);
}

const pathToSearch = getCommandInPosition(2);
const optionsToEval = getCommandInPosition(3);


if (require.main === module) {
  mdLinks(pathToSearch, optionsToEval);  // si se ejecuta desde la linea de comandos... llama a la función mdLinks with pathToSearch and optionsToEval
}
