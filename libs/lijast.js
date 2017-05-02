'use strict';

function _t()
{
  let globalAll = 0;
  let globalFail = 0;
  let globalPass = 0;

  let currentName = '';
  let currentAll = 0;
  let currentFail = 0;
  let currentPass = 0;

  function assert(value1, value2)
  {
    if(value1 === value2)
    {
      return 0;
    }
    return 1;
  };

  this.runTest = function(name, actual, expected)
  {
    const result = assert(actual, expected);
    if(result === 0)
    {
      console.log("test " + name + " done");
      currentPass++;
    }
    else
    {
      console.log("test " + name + " fail!");
      currentFail++;
    }
    currentAll++;
  };

  this.startTests = function(name)
  {
    currentAll = 0;
    currentFail = 0;
    currentPass = 0;
    currentName = name;
    console.log('start tests ' + name);
  }

  this.endTests = function()
  {
    globalAll += currentAll;
    globalFail += currentFail;
    globalPass += currentPass;
    console.log("test " + currentName +
    " pass="+ currentPass +
    " fail=" + currentFail);
  }

  this.startGlobalTests = function()
  {
    globalAll = 0;
    globalFail = 0;
    globalPass = 0;
    console.log('start tests');
  }

  this.endGlobalTests = function()
  {
    console.log("all test=" + globalAll +
    " pass="+ globalPass +
    " fail=" + globalFail);
  }
};

export function Test()
{
  return new _t();
};
