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
        links.push(href,text,pathToSearch);
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



function mdLinks(filePath, evalOption) {
  let links = [];


  const principal = (filePath, evalOption, links) => {

    return new Promise((resolve, reject) => {



      const reviewAfolder = (filePath, evalOption, links) => {
        return new Promise((resolve, reject) => {



          const readAfile = (filePath, evalOption, links) => {
            return new Promise((resolve, reject) => {
              fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) throw err;
                resolve(data);
              });
            });
          }


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

      reviewAfolder(filePath, evalOption, links)
        .then(res => {
          resolve(res);
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
