const mdLinks1 = require('../index.js');
// const readme = require('../readme1.md');

 // import { mdLinks} from '../index.js';




describe('Funcion mdLinks',() =>{

it('is a function', () => {
  expect(typeof reviewAfolder).toBe('function');
});


  it('Debería retornar los links para un archivo Markdown', () => {

    let filePath = 'readme1.md'
    return mdLinks1.reviewAfolder(filePath).then(res => {
    expect(res).toBe([ { href: 'https://trello.com/b/tEwxHA7M/social-network',
    text: 'aquí',
    path: 'readme1.md' } ]);
    });
  });



});
