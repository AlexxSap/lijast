'use strict';

import {TestIsEqual} from './TIsEqual';
import {TestSum} from './TSum';
import {TestCheckParameters} from './checkParameters';
import {TestGetArgumentsArray} from './getArgumentsArray';
import {TestComporator} from './TComparator';

import {Lijast} from "../libs/lijast";

TestIsEqual();
TestSum();
TestCheckParameters();
TestGetArgumentsArray();
TestComporator();

Lijast.totalInfo();
