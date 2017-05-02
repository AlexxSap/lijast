
'use strict';

import {sum} from "../src/sum";
import {Test} from "../libs/lijast";

let $ = Test();

$.startGlobalTests();
$.startTests('sum');
$.runTest('simple1', sum(1, 3), 4);
$.runTest('simple2', sum(1, 4), 4);
$.runTest('simple3', sum(6, 0), 6);
$.endTests();
$.endGlobalTests();
