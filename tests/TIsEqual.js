'use strict';

import {Lijast} from "../libs/lijast";
import {isEqual} from "../src/sum";

export function TestIsEqual()
{
  let _ = Lijast.create();

  _.addCase('equals values', {left: 1, right: 1});
  _.addCase('not equals values', {left: 2, right: 1});

  _.setChecker('tests for isEqual', function({right, left})
  {
    _.verify(isEqual(left, right) === true);
  });
};

// TestIsEqual();
