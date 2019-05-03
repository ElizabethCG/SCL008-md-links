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

  // const data = await mdLinks1(filePath,evalOption);
  // expect(data).resolves.toBe("HOLA");

  await expect(mdLinks1(filePath,evalOption,links)).resolves.toEqual([[ { href: 'https://trello.com/b/tEwxHA7M/social-network',
    text: 'aquí',
    path: 'readme1.md' } ]]);
  });

});





// it('Debería leer un archivo.md markdown', () => {
//   let filePath = 'readme1.md'
//
//   return expect(mdLinks1(filePath)).resolves.toBe([ { href: 'https://trello.com/b/tEwxHA7M/social-network',
//     text: 'aquí',
//     path: 'readme1.md' } ]);
//   });
//
//
// it('Debería leer un archivo.md markdown', () => {
//   let filePath = 'readme1.md'
//
//   return expect(mdLinks1.readAfile(filePath)).resolves.toBe('[aquí](https://trello.com/b/tEwxHA7M/social-network)');
//   });
//



  // it('Debería retornar los links para un archivo Markdown', () => {
  //
  //   let filePath = 'readme1.md'
  //
  //   return mdLinks1.readAfile(filePath).then(res => {
  //   expect(res).toEqual([ { href: 'https://trello.com/b/tEwxHA7M/social-network',
  //   text: 'aquí',
  //   path: 'readme1.md' } ]);
  //   });
  // });
