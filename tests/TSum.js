'use strict';

import {lijast} from "../libs/lijast";
import {sum} from "../src/sum";

export function TestSum()
{
  let _ = lijast();

  _.addCase('simple1', {first: 1, second: 3,   expected: 4 });
  _.addCase('simple2', {first: 0, second: 666, expected: 666 });
  _.addCase('simple3', {first: 1, second: 666, expected: 666 });
  _.addCase('simple4', {expected: 2, first: 1, second: 1 });

  _.setChecker('tests for sum', function({first, second, expected})
  {
    const actual = sum(first, second);
    _.isEqual(actual, expected);
  });
}
