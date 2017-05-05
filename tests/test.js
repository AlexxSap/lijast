'use strict';

import {lijast} from "../libs/lijast";
import {sum, isEqual} from "../src/sum";

{
  let _ = lijast('tests for sum');

  _.addCase('simple1', {first: 1, second: 3,   expected: 4 });
  _.addCase('simple2', {first: 0, second: 666, expected: 666 });
  _.addCase('simple3', {first: 1, second: 666, expected: 666 });
  _.addCase('simple4', {expected: 2, first: 1, second: 1 });

  _.setChecker(function({first, second, expected})
  {
    const actual = sum(first, second);
    _.isEqual(actual, expected);
  });

  _.run();
}

{
  let another = lijast('tests for isEqual');

  another.addCase('equals values', {left: 1, right: 1});
  another.addCase('not equals values', {left: 1, right: 3});

  another.setChecker(function({right, left})
  {
    another.verify(isEqual(left, right) === true);
  });

  another.run();
}
