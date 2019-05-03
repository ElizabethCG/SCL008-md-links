// const mdLinks1 = require('../index.js');
const mdLinks1 = require('../md-links.js');

describe('Funcion mdLinks',() =>{
test('is a function', () => {
  expect(typeof mdLinks1).toBe('function');
});

test('Debería leer un archivo.md markdown', async () => {

  let filePath = 'readme1.md';
  let evalOption=1;
  let links=[];


  await expect(mdLinks1(filePath,evalOption,links)).resolves.toEqual([[ { href: 'https://trello.com/b/tEwxHA7M/social-network',
    text: 'aquí',
    path: 'readme1.md' } ]]);
  });

});
