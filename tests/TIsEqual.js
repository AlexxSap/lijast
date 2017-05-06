'use strict';

import {lijast} from "../libs/lijast";
import {isEqual} from "../src/sum";

export function TestIsEqual()
{
  let _ = lijast();

  _.addCase('equals values', {left: 1, right: 1});
  _.addCase('not equals values', {right: 1, left: 3});

  _.setChecker('tests for isEqual', function({right, left})
  {
    _.verify(isEqual(left, right) === true);
  });
};
