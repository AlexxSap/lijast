`lijast - LIbrary for JAvaSctipt Testing`

Модуль ("библиотека") создания тестов для javascript кода.

Причина

Огромногое количество статей и воросов о том как подключить и заставить работать `chai` и `mocha` (и кто только даёт им названия) с es6 мне так и не помогли их запустить без использования `html` (о чём и свидетельствует это количество). Кроме того организация запуска множества тестов с этими библиотеками довольно затруднительна. Нужно было простое средство тестирования, которое позволяло бы не задумываться о том как заставить работать служебные средства (ведь тесты - это не цель разработки, а средство обеспечения качества и снижения стресса разработки).

Преимущества

- простота использования
- модуль написан полностью на `javascript es6` без использования каких-либо сторонних библиотек, поэтому может использовать все преимущества языка - тестовые функции - это и есть функции `javascript`, которые можно передавать, экспортировать, импортировать.
- не требуется установка пакетов, просто копируйте файл в тестовый каталог, импортируйте модуль и используйте.
- полный контроль над процессом тестирования
- бесплатность и открытость, используется лицензия `GNU LGPL v3`

Примеры использования

Нужно протестировать простую функцию.

В файле `sum.js` объявлена функция

```
'use strict';
export let sum = (a, b) => a + b;
```

В каталоге с тестами создаём файл, например `test-sum.js`. Импортируем функцию и модуль тестирования

```
'use strict';

import {Lijast} from "путь/к/модулю/lijast";
import {sum} from "путь/к/модулю/sum";
```

Объявляем функцию тестирования

```
function TestSum(){

}
```

в теле функции создаём объект тестирования

```
let T = Lijast.create();
```

добавляем кейсы тестов (их может быть сколько угодно)

```
T.addCase('simple1',
{first: 1, second: 3,  expected: 4 });
```

`'simple1'` - простое обозначение тестовых данных, не является идентификатором и служит для удобства

`{first: 1, second: 3, expected: 4 }` - тестовые данные

Задаём тестовую функцию

```
T.setChecker('tests for sum',
function({first, second, expected}){
  const actual = sum(first, second);
  T.isEqual(actual, expected);
});
```

`'tests for sum'` - простое обозначение тестовой функции, не является идентификатором и служит для удобства
`{first, second, expected}` - параметры, указанные в кейсах, если параметры в кейсе не совадают с параметрами функции, то тест упадёт с сообщением "parameters mistmatch"
`const actual = sum(first, second);` - тут всё ясно
`T.isEqual(actual, expected);` - проверка значений. Метод isEqual принимает три параметра: `actual, expected, comparator` - два значения которые нужно сравнить и компаратор. Для примитивов и массивов используется встроенный в библиотеку компаратор.

Итого получается

```
'use strict';

import {Lijast} from "путь/к/модулю/lijast";
import {sum} from "путь/к/модулю/sum";

function TestSum(){
  let T = Lijast.create();

  T.addCase('simple1',
  {first: 1, second: 3,  expected: 4 });

  T.setChecker('tests for sum',
  function({first, second, expected}){
    const actual = sum(first, second);
    T.isEqual(actual, expected);
  });
}
```

Теперь нужно просто запустить тестовую функцию

```
TestSum();
```

В выводе консоли мы увидим следующее

```
Start testing of 'tests for sum'
PASS! tests for sum(simple1)
Totals: 1 passed, 0 failed, 0 skipped
Finished testing of 'tests for sum' for 1 ms
```

Можно так же использовать методы уравления потоком выполнения
`skip(message)` - прерывает тест для текущих тестовых данных
`fail(message)` - роняет тест для текущих тестовых данных

Кроме `isEqual` есть еще проверка `verify(actual)` для сравнения значения с `true` (используется сравнение `===`).

Пометив нашу тестовую функию как эксортную

`export function TestSum()` и убрав её вызов

мы можем импортировать её в другом файле и запустить. Таким образом можно задать множество тестов, которые будут запускаться из одного места.

Например

```
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
```

строка `Lijast.totalInfo();` выводит сообщения вида

```
Testing result: 23 passed, 3 failed, 1 skipped
```

с информацией по всем пройденным тестам
