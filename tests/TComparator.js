'use strict';

import {Lijast} from "../libs/lijast";


export function TestComporator()
{
  let _ = Lijast.create();

  _.addCase('simple-equal',
  {
    first: 1,
    second: 1,
    comparator: (a, b) => a === b
  });

  _.addCase('simple-not-equal',
  {
    first: 1,
    second: 3,
    comparator: (a, b) => a === b - 2
  });

  let cmp = (a, b) => a == b;

  _.addCase('equals',
  {
    first: 1,
    second: '1',
    comparator: cmp
  });

  _.setChecker('tests for comparator', function({first, second, comparator})
  {
    _.isEqual(first, second, comparator);
  });
}

// TestComporator();
