'use strict';

class _t
{
  constructor()
  {
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

    this.time = new Date();

    console.log(`Start testing of ${this.testedName}`);

    for(let index = 0; index < this.names.length; index++)
    {
      this.currentName = this.names[index];
      let params = this.cases[index];

      this.currentResult = true;
      this.func(params);

      const testString = `${this.testedName}(${this.currentName})`;

      if(this.currentResult === true)
      {
        this.passed++;
        console.log('\x1b[32m%s\x1b[0m', 'PASS!', testString);
      }
      else
      {
        this.failed++;
        console.log('\x1b[31m%s\x1b[0m', 'FAIL!', testString);
        console.log(`   actual  : ${this.currentActual}`);
        console.log(`   expected: ${this.currentExpected}`);
      }
    }

    this.time = new Date() - this.time;

    const color = this.failed == 0 ? '\x1b[32m' : '\x1b[31m';
    console.log(color + '%s\x1b[0m',
      `Totals: ${this.passed} passed, ${this.failed} failed`);

    console.log(`Finished testing of \'${this.testedName}\' for ${this.time} ms`);
  }

  setChecker(testedName, func)
  {
    this.testedName = testedName;
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
        this.currentActual = actual;
        this.currentExpected = expected;
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
