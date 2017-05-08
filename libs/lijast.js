'use strict';

function getArgumentsArray(func)
{
  const str = func.toString();

  let pattern = '';
  {
    const start = str.indexOf('(', 0) + 1;
    const end = str.indexOf(')', start + 1);
    pattern = ' ' + str.slice(start, end) + '.';
  }

  let pos = 0;
  let result = [];

  while(true)
  {
    let start = str.indexOf(pattern, pos);

    if(start == -1)
    {
      break;
    }

    start += pattern.length;
    let end = str.indexOf(',', start);
    let end2 = str.indexOf(';', start);

    if(end == -1)
    {
      end = end2;
    }
    else if(end2 < end)
    {
      end = end2;
    }

    let substr = str.slice(start, end);
    result.push(substr);

    pos = end + 1;
  }

  return result;
};

function checkParameters(func, params)
{
  let funcArguments = getArgumentsArray(func);
  let paramsKeys = Object.keys(params);

  if(funcArguments.length != paramsKeys.length)
  {
    return false;
  }

  funcArguments.sort();
  paramsKeys.sort();

  for(let index = 0; index < paramsKeys.length; index++)
  {
    if(funcArguments[index] !== paramsKeys[index])
    {
      return false;
    }
  }

  return true;
};

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

class ParametersMistmatch extends Error
{
  constructor(message)
  {
    super();
    this.name = 'parametersMistmatch';
    this.message = 'parameters mistmatch';
  }
};

class Failed extends Error
{
  constructor(message)
  {
    super();
    this.name = 'failed';
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
        if(checkParameters(this.func, params))
        {
          this.func(params);
        }
        else
        {
          this.parametersMistmatch();
        }

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
        else if(e.name === 'parametersMistmatch')
        {
          console.log('\x1b[31m%s\x1b[0m',`FAIL! parameters mistmatch for  \'${this.currentName}\'`);
          this.failed++;
          continue;
        }
        else if(e.name === 'failed')
        {
          console.log('\x1b[31m%s\x1b[0m',`FAIL! \'${this.currentName}\' with \'${e.message}\'`);
          this.failed++;
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

  isEqual(actual, expected, comparator)
  {
    if(this.currentResult === true)
    {
      if(comparator == undefined)
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
      else
      {
          this.verify(comparator(actual, expected));
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

  fail(message)
  {
    throw new Failed(message);
  }

  parametersMistmatch()
  {
    throw new ParametersMistmatch();
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
