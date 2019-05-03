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















///////////////////////////////////////////////////////
//
// const fs = require('fs');
// const miFuncionSuma = (numeroPrimero, numeroSegundo)=>{
//   return numeroPrimero + numeroSegundo;
// }
// const resultado = miFuncionSuma(1,1);
// const miFunctionAsincrona = (otraFuncion) => {
//   setTimeout(otraFuncion, 2000);
// }
// miFunctionAsincrona(miFuncionSuma);
//
// //Horrible
// fs.readFile('index.html', 'utf-8',(error, data)=>{
//   if(error){
//     return "Error";
//   }
//   fs.readFile('app.js', 'utf-8', (error2, data2)=>{
//     if(error2){
//       return "Error 2";
//     }
//     console.log(data);
//   });
// });
//
// const readFilePromise = (file, cod)=>{
//   return new Promise((resolve, reject)=>{
//     fs.readFile(file, cod, (error, data)=>{
//       if(error) return reject(error);
//       resolve(data);
//     })
//   });
// }
//
// //Lo mejor
// let data = null;
// const indexPromise = readFilePromise('index.html', 'utf-8');
// indexPromise
//   .then((d)=>{
//     data = d;
//     console.log("&&&&"+data);
//     return readFilePromise('app.js', 'utf-8');
//   })
//   .then((data2)=>{
//     console.log("#### "+data);
//     console.log("DATA 2 > "+data2);
//     return 2;
//   })
//   .then((data3)=>{
//     console.log("DATA 3 > "+data3);
//   })
//   .catch(console.error);
//
//   const parallelPromise = Promise.all([readFilePromise('index.html', 'utf-8'),
//               readFilePromise('app.js', 'utf-8')]);
//
//    parallelPromise.then((data)=>{
//    console.log(data);
//    });
