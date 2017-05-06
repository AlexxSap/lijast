'use strict';

import {TestIsEqual} from './TIsEqual';
import {TestSum} from './TSum';
import {TestCheckParameters} from './checkParameters';
import {TestGetArgumentsArray} from './getArgumentsArray';

import {Lijast} from "../libs/lijast";

TestIsEqual();
TestSum();
TestCheckParameters();
TestGetArgumentsArray();

Lijast.totalInfo();
