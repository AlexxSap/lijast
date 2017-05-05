'use strict';

class _t
{
  constructor(testedName)
  {
    this.testedName = testedName;
    this.cases = [];
    this.names = [];
    this.currentName = '';
    this.currentResult = true;
  }

  addCase(name, values)
  {
      this.names.push(name);
      this.cases.push(values);
  }

  setChecker(func)
  {
    this.func = func;
  }

  run()
  {
    //проверка полей объекта values и аргументов функции setChecker

    for(let index = 0; index < this.names.length; index++)
    {

      this.currentName = this.names[index];
      let params = this.cases[index];

      this.func(params);

      if(this.currentResult === true)
      {
        console.log('\x1b[32m%s\x1b[0m', 'PASS!',
        this.testedName + ':' + this.currentName);
      }
      else
      {
        console.log('\x1b[31m%s\x1b[0m', 'FAIL!',
        this.testedName + ':' + this.currentName);
        console.log(`   actual  : ${this.currentActual}`);
        console.log(`   expected: ${this.currentExpected}`);
      }
    }
  }

  isEqual(actual, expected)
  {

    if(this.currentResult === true)
    {
      if(actual === expected)
      {
        this.currentExpected = expected;
      }
      else
      {
        this.currentResult = true;
        this.currentActual = actual;
        this.currentResult = false;
      }
    }
  }

  verify(actual)
  {
    if(this.currentResult === true)
    {
        this.currentResult = actual;
    }
    else
    {
      this.currentResult = false;
      this.currentActual = actual;
      this.currentExpected = true;
    }

  }
};

export function lijast(testedName)
{
  return new _t(testedName);
};
