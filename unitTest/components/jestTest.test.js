const jestTest = require('../../src/untils/jestTest')
const { add , minnus } = jestTest;
test('test add 1+1=2',()=>{
   expect(add(1,1)).toBe(2)
})
test('test minnus 1-1=0',()=>{
   expect(minnus(1,1)).toBe(0)
})