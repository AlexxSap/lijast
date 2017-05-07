'use strict';

import {getArgumentsArray} from './getArgumentsArray.js';

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
}

import {Lijast} from "../libs/lijast";


export function TestCheckParameters()
{
  let _ = Lijast.create();

  _.addCase('empty',
  {func: function({}){}, params: {}, result: true});

  _.addCase('simple-pass',
  {func: function({a}){}, params: {a: 1}, result: true});

  _.addCase('simple-fail-1',
  {func: function({a}){}, params: {b: 1}, result: false});

  _.addCase('simple-fail-2',
  {func: function({a}){}, params: {}, result: false});

  _.addCase('complex-pass', {func: function({first, second, expected}){}, params: {first: 1, expected: 2, second: 3}, result: true});

  _.addCase('complex-fail-1',
  {func: function({first, second, expected}){}, params: {first: 1, e3xpected: 2, second: 3}, result: false});

  _.addCase('complex-fail-2',
   {func: function({first, second, expected}){}, params: {first: 1, expected: 2}, result: false});

   _.addCase('array',
    {func: function({data}){return data;}, params: {data: [1,2,3]}, result: true});

  _.addCase('object',
     {func: function({data}){return data;}, params: {data: {name: 'vasia'}}, result: true});

  _.addCase('object-array',
      {func: function({obj, arr}){}, params: {arr: [1,2,3], obj: {name: 'vasia'}}, result: true});

  _.addCase('from-sum', {func: function({first, second, expected})
      {
          if(first == second)
          {
            _.skip('equals values');
          }
          const actual = sum(first, second);
          _.isEqual(actual, expected);
      }, params: {first: 1, second: 2, expected: 3}, result: true});

  _.setChecker('tests for checkParameters', function({func, params, result})
  {
    _.verify(checkParameters(func, params) == result);
  });
};

// TestCheckParameters();
