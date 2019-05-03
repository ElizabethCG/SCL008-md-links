
const fs = require('fs');
const path = require('path');
const https = require('https');
let marked = require('marked');
let markdownLinkExtractor = require('markdown-link-extractor');


///Código perteneciente al módulo "markdown-link-extractor", pero edidtado para desplegar 3 parámetros/
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



function mdLinks(filePath, evalOption) {
  let links = [];

      const readAfile = (filePath, evalOption, links) => {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, 'utf8', (err, data) => {
            console.log(data);
            if (err) throw err;
            resolve(data);
          });
        });
      }

    const extractLinks = (fileToExtractLinks)=> {
      return new Promise((resolve, reject) => {
        links.push(markdownLinkExtractorb(fileToExtractLinks,filePath));
            resolve(links);
          })
      }

    return readAfile(filePath, evalOption, links)
      .then(readingResult => {
        return extractLinks(readingResult);
      })
      .then(linksResult => {
            linksResult.forEach(function (link) {  // Imprime los elementos del array de resultado
             console.log(link);
            });
            return linksResult;
          })
        .catch(error => {
          console.error(error);
        });
  }

module.exports = mdLinks;
