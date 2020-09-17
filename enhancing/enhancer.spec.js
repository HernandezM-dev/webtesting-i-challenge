const { get } = require('http');
// const { testEnvironment } = require('../jest.config.js');
const enhancer = require('./enhancer.js');
//set up pre-requisites for the code under test
const item = {
    name: "excalibur",
    durability: 90,
    enhancement: 1,
}

test('Testing fail enhancer', () => {
    //set up pre-requisites for the code under test
    const low = {...item, enhancement: 14}
    const high = {...item, enhancement: 16}
    const highest = {...item, enhancement: 17}
    //execute the code
    const result = enhancer.fail(low)
    const result2 = enhancer.fail(high)
    const result3 = enhancer.fail(highest)
    //look at the result and see if it matches our expectations
    expect(result.durability).toBe(85)
    expect(result2.durability).toBe(80)
    expect(result3.durability).toBe(80)
    expect(result3.enhancement).toBe(16)

})

test('Testing success enhancer', () => {
    //execute the code
    const successResult = enhancer.success(item)

    //look at the result and see if it matches our expectations
    expect(successResult.enhancement).toBe(2)
})

test('Testing the repair enhancer', () =>{
    const result = enhancer.repair(item)
    expect(result.durability).toBe(100)
})

test('Test get method', () =>{
    const zeroEnhancement = {...item, enhancement: 0}

    const getResult = enhancer.get(item)
    const changeName = getResult.setName()
    expect(getResult).toHaveProperty('setName')
    expect(getResult).toHaveProperty('name', 'excalibur')
    expect(changeName).toHaveProperty('name', '[+1]excalibur')
})