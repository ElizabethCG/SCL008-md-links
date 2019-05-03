`#!/usr/bin/env node`

const fs = require('fs');
const path = require('path');
const https = require('https');
let markdownLinkExtractor = require('markdown-link-extractor');


///Código perteneciente al módulo "markdown-link-extractor", pero edidtado para desplegar 3 parámetros/
let marked = require('marked');
function markdownLinkExtractorb(markdown,pathToSearch) {
    var links = [];
    var renderer = new marked.Renderer();
    // Taken from https://github.com/markedjs/marked/issues/1279
    var linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;
    marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
    marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
    marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;
    renderer.link = function (href, title, text) {
        links.push({href:href,text:text,path:pathToSearch});
    };
    renderer.image = function (href, title, text) {
        // Remove image size at the end, e.g. ' =20%x50'
        href = href.replace(/ =\d*%?x\d*%?$/, "");
        links.push({href:href,text:text,path:pathToSearch});
    };
    marked(markdown, { renderer: renderer });
    return links;
};
///Fin código perteneciente al módulo "markdown-link-extractor", pero edidtado para desplegar 3 parámetros/




const getCommandInPosition = (pos) => {
  return (process.argv[pos]);
}

const pathToSearch = getCommandInPosition(2);
const optionsToEval = getCommandInPosition(3);


if (require.main === module) {
  mdLinks(pathToSearch, optionsToEval);  // si se ejecuta desde la linea de comandos... llama a la función mdLinks with pathToSearch and optionsToEval
}

///////////////////////////////////////////////////////

function mdLinks(filePath, evalOption) {
  let links = [];

      const readAfile = (filePath, evalOption, links) => {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            resolve(data);
          });
        });
      }



    const principal = (filePath, evalOption, links)=> {
      return new Promise((resolve, reject) => {
        readAfile(filePath, evalOption, links)
          .then(res => {

            links.push(markdownLinkExtractorb(res,filePath));
            resolve(links);
          })
          .catch(error => {
            console.log(error);
          });
      });
    }


      principal(filePath, evalOption, links)
        .then(res => {
          // Imprime los elementos del array de resultado
          res.forEach(function (link) {
             console.log(link);
            });
          })
        .catch(error => {
          console.log(error);
        });

    }

////////////////////////////////////////////


module.exports = mdLinks;






















///////////////////////////////
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
