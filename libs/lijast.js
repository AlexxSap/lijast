'use strict';

class IsNotEquals extends Error
{
  constructor()
  {
    super();
    this.name = 'IsNotEquals';
    this.message = 'isEquals return fail';
  }
};

class NotVerify extends Error
{
  constructor()
  {
    super();
    this.name = 'NotVerify';
    this.message = 'verify return fail';
  }
};

class Skipped extends Error
{
  constructor(message)
  {
    super();
    this.name = 'skipped';
    this.message = message;
  }
};

export class Lijast
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
    this.skipped = 0;

    this.time = new Date();

    console.log(`Start testing of \'${this.testedName}\'`);

    for(let index = 0; index < this.names.length; index++)
    {
      this.currentName = this.names[index];
      let params = this.cases[index];

      this.currentResult = true;

      try
      {
        this.func(params);
      }
      catch(e)
      {
        if(e.name === 'skipped')
        {
          console.log(`SKIP \'${this.currentName}\' with \'${e.message}\'`);
          this.skipped++;
          Lijast.totalSkipped++;
          continue;
        }
      }

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

    Lijast.totalPassed += this.passed;
    Lijast.totalFailed += this.failed;

    const color = this.failed == 0 ? '\x1b[32m' : '\x1b[31m';
    console.log(color + '%s\x1b[0m',
      `Totals: ${this.passed} passed, ${this.failed} failed, ${this.skipped} skipped`);

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
      if(Array.isArray(actual) && Array.isArray(expected))
      {
        if(actual.length == expected.length)
        {
          for(let index = 0; index < actual.length; index++)
          {
            if(actual[index] !== expected[index])
            {
              this.currentResult = false;
              this.currentActual = actual;
              this.currentExpected = expected;
              throw new IsNotEquals();
            }
          }
        }
        else
        {
          this.currentResult = false;
          this.currentActual = actual;
          this.currentExpected = expected;
          throw new IsNotEquals();
        }
      }
      else if(actual !== expected)
      {
        this.currentResult = false;
        this.currentActual = actual;
        this.currentExpected = expected;
        throw new IsNotEquals();
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
        throw new NotVerify();
      }
    }
  }

  skip(message)
  {
    throw new Skipped(message);
  }

  static totalInfo()
  {
    const color = Lijast.totalFailed == 0 ? '\x1b[32m' : '\x1b[31m';
    console.log(color + '%s\x1b[0m', `Testing result: ${Lijast.totalPassed} passed, ${Lijast.totalFailed} failed, ${Lijast.totalSkipped } skipped`);
  }

  static create(testedName)
  {
    return new Lijast(testedName);
  }
};

Lijast.totalPassed = 0;
Lijast.totalFailed = 0;
Lijast.totalSkipped = 0;
