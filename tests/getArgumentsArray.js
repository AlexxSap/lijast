'use strict';

export function getArgumentsArray(func)
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

    if(end == -1)
    {
      end = str.indexOf(';', start);
    }

    let substr = str.slice(start, end);
    result.push(substr);
    pos = end + 1;
  }

  return result;
}

import {Lijast} from "../libs/lijast";

export function TestGetArgumentsArray()
{
  let _ = Lijast.create();

  _.addCase('parameter-1', {func: function({a}){}, expected: ['a']});
  _.addCase('parameter-2', {func: function({a, b}){}, expected: ['a', 'b']});
  _.addCase('parameter-3', {func: function({param}){}, expected: ['param']});
  _.addCase('parameter-4', {func: function({first, second, expected}){}, expected: ['first', 'second', 'expected']});

  _.setChecker('tests for getArgumentsArray', function({func, expected})
  {
    _.isEqual(getArgumentsArray(func), expected);
  });
};

//TestGetArgumentsArray();
