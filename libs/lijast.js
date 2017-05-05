'use strict';

class _t
{
  constructor(testedName)
  {
    this.testedName = testedName;
    this.init();
  }

  init()
  {
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

  run()
  {
    this.passed = 0;
    this.failed = 0;
    //проверка полей объекта values и аргументов функции setChecker

    console.log(`---------- start testing of ${this.testedName} ----------`);

    for(let index = 0; index < this.names.length; index++)
    {
      this.currentName = this.names[index];
      let params = this.cases[index];

      this.currentResult = true;

      this.func(params);

      if(this.currentResult === true)
      {
        this.passed++;
        console.log('\x1b[32m%s\x1b[0m', 'PASS!',
        this.testedName + ':' + this.currentName);
      }
      else
      {
        this.failed++;
        console.log('\x1b[31m%s\x1b[0m', 'FAIL!',
        this.testedName + ':' + this.currentName);
        console.log(`   actual  : ${this.currentActual}`);
        console.log(`   expected: ${this.currentExpected}`);
      }
    }

    console.log(`Totals: ${this.passed} passed, ${this.failed} failed`);
    console.log(`---------- finished testing of ${this.testedName} ----------`);
  }

  setChecker(func)
  {
    this.func = func;
    this.run();
    this.init();
  }

  isEqual(actual, expected)
  {
    if(this.currentResult === true)
    {
      if(actual !== expected)
      {
        this.currentResult = false;
        this.currentActual = false;
        this.currentExpected = true;
      }
    }
  }

  verify(actual)
  {
    if(this.currentResult === true)
    {
      if(actual === false)
      {
        this.currentResult = false;
        this.currentActual = false;
        this.currentExpected = true;
      }
    }
  }
};

export function lijast(testedName)
{
  return new _t(testedName);
};
