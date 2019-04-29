const math = require('../src/math');

describe('Funcion add',() =>{
it('Debería retornar 4 para suma de 2+2',() =>{expect (math.add(2,2)).toBe(4)
  })

it('Debería retornar false si es que uno de los parámetros no es número',()=>{
  expect(math.add(2,"2")).toBe("false")
  })
})
