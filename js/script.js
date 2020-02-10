// инструкция о том как работает функци и какие параметры передвать
// можно прочитать в файле README.txt

// для вывода дробных чисел





/* === Табы === begin */

var tabHead = document.querySelector('.tab__head');
var tabHeader = document.querySelectorAll('.tab__header');
var tabContent = document.querySelectorAll('.panel__content');



tabHead.onclick = function (event) {
  var value;
  if (event.target.hasAttribute('data-tab'))
  value = parseFloat(event.target.getAttribute('data-tab'));

  if (event.target.hasAttribute('data-tab') == false)
  value = 0;

  for (let i = 0; i < tabHeader.length; i++) {
    tabHeader[i].classList.remove('active');
    tabContent[i].classList.remove('show');
  }
  if (typeof value == 'number') {
    tabHeader[value].classList.add('active');
    tabContent[value].classList.add('show');
    tabContent[value].classList.add('showBlock');
  }

  document.querySelector('.panel').style.height = (tabContent[value].offsetHeight + 10) + 'px';
}
/* === end ===  */

/* === фукнция сначала удаляет все элементы, после чего будут добавлены
        соответствующие ячейки для ввода в зависимости от полученного
        параметра который пользователь выберет в теге <selec>
 === begin */
function addTableElements(N) {
  N = parseFloat(N);
  var table = {
      row : document.querySelectorAll('table .row'),
      col : document.querySelectorAll('table .row .col')
  }

  var tbody = document.querySelector('table tbody');
  var length_row = document.querySelectorAll('table .row').length;
  var length_col = document.querySelectorAll('table .row .col').length;

  // удаление для строк row

  for (let i = 0; i < length_row; i++)
  table.row[i].remove();


  var newRows = [],
      newCols = [];

  for (let i = 0; i < N; i++) {
    newRows[i] = document.createElement('tr');
    newRows[i].classList.add('row');
  }
  for (let j = 0; j < N * N + N; j++) {
    newCols[j] = document.createElement('td');
    newCols[j].classList.add('col');
    newCols[j].innerHTML = '<input type="text" class=" input" placeholder="0">';
  }

  let count = 0;
  //     if ((N * N + N) % N + 1 == 0)
  for (let value = 0; value < N * N + N; value++) {
    if (value != 0 && value % (N + 1) == 0)
      count += 1;

    newRows[count].append(newCols[value]);

  }

  for (let i = 0; i < newRows.length; i++) {
    tbody.append(newRows[i]);
  }

  // так как после добавление элементов высота блока меняется поэтому родительскому
  // блоку надоо сообщить об этом, так как эелемент расположен абсолютно
  setTimeout (function(){
    document.querySelector('.panel').style.height = (tabContent[0].offsetHeight + 10) + 'px';
  }, 1000);

  // для кнопка очистки чтобы оно всегда находился в правом нижнем углу таблицы
  document.querySelector('.btn-group').style.width = (document.querySelector('.body-cell').offsetWidth - 10) + 'px';
}
/* === end ===  */



/* === Функция для очисти блока отчет и ячеек таблицы === begin */
function clearAll() {
  document.querySelector('.report').innerHTML = '';
  var cells = document.querySelectorAll('.input');
  var length = cells.length;
  var iteration = 0;
  for (; iteration < length; iteration++) {
    cells[iteration].value = '';
  }
}
/* === end ===  */




/* === Функция возвращает значение value выбранного option === begin */
function getValueSelected(selectorName) {
  var element = document.querySelector('.' + selectorName);
  var elements = document.querySelectorAll('.' + selectorName + ' option');

  if (selectorName == 'selected-1') {
    var length = elements.length;
    var i = 0;
    for(; i < length; i -= -1)
      elements[i].removeAttribute('selected');
  }

  var option = element.options[element.selectedIndex];  // получение элемента который был выбран пользователем

  var value = parseFloat(option.getAttribute('value'));  // взятие значение value выбранного элемента
  option.setAttribute('selected', 'selected'); // установку выбранному элементу атрибут selected
  return value;
}
/* === end ===  */



/* === Функция для динамического обновление ячеек таблицы === begin */
document.querySelector('.selected-1').onchange = function () {
  var value = getValueSelected('selected-1');
  addTableElements(value);
  document.querySelector('.head-row .head-col').removeAttribute('colspan');
  document.querySelector('.head-row .head-col').setAttribute('colspan', value);

  // при изменеие количество ячеек удаляется и отчет
  var reportblock = document.querySelector('.report');
  reportblock.innerHTML = '';
}
/* === end === */



/* === функция для преоброзование элементов инпут в массив, возвращает массив === begin */
function conversion_input(inputs) {
  var elements = document.getElementsByClassName(inputs),
       length = elements.length;
       arr_temporary = [],
       i = 0;

  for (; i < length; i -= -1) {
    arr_temporary[i] = elements[i].value;
  }
  return arr_temporary;
}
/* === end ===  */



/* === функция для разбивки одномерного массив, возвращает двумерный массив === begin */
function array_chunk(input, size){
  for(var x, i = 0, c = -1, l = input.length, n = []; i < l; i++){
    (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
  }
  return n;
}
/* === end ===  */



/* === функция для происвение нулей пустым полям input === begin */
function zeroingArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++)
      if (arr[i][j] == false) {
        arr[i][j] = 0;
      }
  }
}
/* === end ===  */



/* === функция для перевода матрицу в parseFloat === begin */
function trans_matrix(arr){
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      arr[i][j] = parseFloat(arr[i][j]);
    }
  }
}
/* === end ===  */


/* === Алгоритм Томаса (Метод прогонки) для СЛАУ === begin */
function algorithm(arr, rounding) {
  let rows_length = arr.length;
  let a = [],
      b = [],
      c = [],
      d = [],
      x = [],
      y = [];


  // получение всех d[i]
  for (let i = 0; i < rows_length; i+= 1)
    d[i] = arr[i][rows_length];

    // получение всех c[i]
  for (let i = 0; i < rows_length - 1; i += 1)
    c[i] = arr[i][i+1];


  for (let i = 0; i < rows_length; i++) {
        // прямая прогонка
        if (i == 0) {
          y[0] = arr[i][i];
          a[0] = -arr[i][1] / y[0];
          b[0] = arr[0][rows_length] / y[0];
        }

        if (i > 0 && i < rows_length - 1)
        {
            y[i] = arr[i][i] + arr[i][i - 1] * a[i - 1];
            a[i] = -arr[i][i + 1] / y[i];
            b[i] = (arr[i][rows_length] - arr[i][i - 1] * b[i - 1]) / y[i];
        }
        if (i == rows_length - 1){
            y[i] = arr[i][i - 1] * a[i - 1]  + arr[i][i];

            b[i] = (arr[i][rows_length] - arr[i][i - 1] * b[i - 1]) / y[i];
        }

        // обратная прогонка
        x[rows_length - 1] = b[rows_length - 1];

        if (i == rows_length - 1) {
          x[rows_length - 1] = x[rows_length - 1].toFixed(rounding);
        }

        for (let j = rows_length - 2; j >= 0; j--) {
          x[j] = a[j] * x[j + 1] + b[j];
          x[j] = x[j].toFixed(rounding);
        }
  }
  report_steps(a, b, c, d, x, y, rows_length, arr); // все параметры массив!
  // получить d и c
  return x;
}
/* === end ===  */




/* === Функция для вывода в блок отчета неизвестных Xi === begin */
function report_steps(a, b, c, d, x, y, length_steps, arr) {
  var parent = document.querySelector('.report'); // к нему и будут добавлен блок родитель для параграфов


   var greeting = [
    document.createElement('p'), // решение
    document.createElement('p') // слау имеет вид
  ]

   var greetingText = [
    document.createTextNode('Решение: '), // решение
    document.createTextNode('Пусть СЛАУ имеет вид') // слау имеет вид
  ]

  var length = greeting.length;
  for (let i = 0; i < length; i -= -1)
  {
    greeting[i].append(greetingText[i]);
    greeting[0].classList.add('big', 'error-dark');
    greeting[1].classList.add('error-dark', 'my-2', 'ml-2');
    parent.append(greeting[i]); // add
  }

  var greetingImg = document.createElement('img');
  greetingImg.classList.add('mw-90', 'ml-3');
  greetingImg.setAttribute('src', 'img/tridiagonal-matrix.png');
  greetingImg.setAttribute('alt', 'tridiagonal-matrix');
  parent.append(greetingImg); //add
  // var greetingImg = document.createElement('img');

  parent.insertAdjacentHTML('beforeend', '<h3 class="error-danger biggest my-2"> Прямая Прогонка </h3>');

  greeting[2] = document.createElement('p');
  greeting[2].innerHTML = '<span class="error-danger">1.</span> В первое строке матрицы (i = 1) используются формулы';
  greeting[2].classList.add('text-default', 'error-dark', 'my-2', 'ml-2');
  parent.append(greeting[2]); //add

  var greetingRows = [];

  greetingRows[0] = greetingImg.cloneNode(true);
  greetingRows[0].setAttribute('src', 'img/row_1.png');
  parent.append(greetingRows[0]); //add


  // количество p равна количество строк


  var steps = [];
  var rounding = 3;


  for (let i = 0; i < 1; i -= -1) {
    steps[i] = document.createElement('p');
    steps[i].classList.add('text-sorax', 'my-2', 'ml-3');
    if (i == 0) {
      steps[i].innerHTML =
       `<span class="error-primary-normal">y<sub>${i+1}</sub></span> = b<sub>${i+1}</sub> = <span class="error-primary-normal">${y[i].toFixed(rounding)}</span>; <span class="d-block"></span>
       <span class="error-primary-normal">a<sub>${i+1}</sub></span> = -c<sub>${i+1}</sub>/y<sub>${i+1}</sub> = (${-c[i]}) / (${y[i]}) = <span class="error-primary-normal">${(-c[i]/y[i]).toFixed(rounding)}</span>; <span class="d-block"></span>
       <span class="error-primary-normal">b<sub>${i+1}</sub></span> = d<sub>${i+1}</sub>/y<sub>${i+1}</sub> = (${d[i]}) / (${y[i]}) = <span class="error-primary-normal">${(d[i]/y[i]).toFixed(rounding)}</span>;  <span class="d-block"></span>`
       parent.append(steps[i]);
    }

  }

  greeting[3] = document.createElement('p');
  greeting[3].innerHTML = '<span class="error-danger">2.</span> Для строк i от 2 до n-1 используются рекуррентные формулы:';
  greeting[3].classList.add('text-default', 'error-dark', 'my-2', 'ml-2');
  parent.append(greeting[3]); //add

  greetingRows[1] = greetingImg.cloneNode(true);
  greetingRows[1].setAttribute('src', 'img/row_2.png');
  parent.append(greetingRows[1]); //add


  for (let i = 0; i < length_steps; i -= -1) {
    steps[i] = document.createElement('p');
    steps[i].classList.add('text-sorax', 'my-2', 'ml-3');

    if (i > 0 && i < length_steps - 1) {
      steps[i].innerHTML =
       `<span class="error-primary-normal">y<sub>${i+1}</sub></span> = b<sub>${i+1}</sub> + a<sub>${i+1}</sub> * a<sub>${i}</sub> = ${arr[i][i]} + ${arr[i][i-1]} * ${(a[i-1]).toFixed(rounding)} = <span class="error-primary-normal">${(y[i]).toFixed(rounding)}</span>; <span class="d-block"></span>
       <span class="error-primary-normal">a<sub>${i+1}</sub></span> = -c<sub>${i+1}</sub>/y<sub>${i+1}</sub> = (${-arr[i][i+1]}) / (${(y[i]).toFixed(rounding)}) = <span class="error-primary-normal">${a[i].toFixed(rounding)}</span>; <span class="d-block"></span>
       <span class="error-primary-normal">b<sub>${i+1}</sub></span> = (d<sub>${i+1}</sub> - a<sub>${i+1}</sub>*b<sub>${i}</sub>) / y<sub>${i+1}</sub> = (${d[i]}) - (${arr[i][i+1]} * ${(b[i-1]).toFixed(rounding)}) / ${(y[i]).toFixed(rounding)} = <span class="error-primary-normal">${b[i].toFixed(rounding)}</span>;  <span class="d-block"></span>`
       parent.append(steps[i]);
    }
  }


  greeting[4] = document.createElement('p');
  greeting[4].innerHTML = '<span class="error-danger">3.</span> При i = n прямая прогонка завершается вычислением:';
  greeting[4].classList.add('text-default', 'error-dark', 'my-2', 'ml-2');
  parent.append(greeting[4]); //add

  greetingRows[2] = greetingImg.cloneNode(true);
  greetingRows[2].setAttribute('src', 'img/row_3.png');
  parent.append(greetingRows[2]); //add

  for (let i = 0; i < length_steps; i -= -1) {
    steps[i] = document.createElement('p');
    steps[i].classList.add('text-sorax', 'my-2', 'ml-3');

    if (i == length_steps - 1) {
      steps[i].innerHTML =
       `<span class="error-primary-normal">y<sub>${i+1}</sub></span> = b<sub>${i+1}</sub> + a<sub>${i+1}</sub> * a<sub>${i}</sub> = ${arr[i][i]} + ${arr[i][i-1]} * ${(a[i-1]).toFixed(rounding)} = <span class="error-primary-normal">${(y[i]).toFixed(rounding)}</span>; <span class="d-block"></span>
       <span class="error-primary-normal">b<sub>${i+1}</sub></span> = (d<sub>${i+1}</sub> - a<sub>${i+1}</sub>*b<sub>${i}</sub>) / y<sub>${i+1}</sub> = (${d[i]}) - (${arr[i][i+1]} * ${(b[i-1]).toFixed(rounding)}) / ${(y[i]).toFixed(rounding)} = <span class="error-primary-normal">${b[i].toFixed(rounding)}</span>;  <span class="d-block"></span>`
       parent.append(steps[i]);
    }
  }

  parent.insertAdjacentHTML('beforeend', '<h3 class="error-danger biggest my-2"> Обратная Прогонка </h3>');

  greeting[5] = document.createElement('p');
  greeting[5].innerHTML = '<span class="error-danger">4.</span> В последней строке матрицы (i = n) X<sub>n</sub> = β<sub>n</sub>';
  greeting[5].classList.add('text-default', 'error-dark', 'my-2', 'ml-2');
  parent.append(greeting[5]); //add

  greeting[5] = document.createElement('p');
  greeting[5].innerHTML = '<span class="error-danger">5.</span> Для всех остальных строк при i от n-1 до 1 применяется формула:';
  greeting[5].classList.add('text-default', 'error-dark', 'my-2', 'ml-2');
  parent.append(greeting[5]); //add

  greetingRows[3] = greetingImg.cloneNode(true);
  greetingRows[3].setAttribute('src', 'img/xi.png');
  parent.append(greetingRows[3]); //add

  steps[0] = document.createElement('p');
  steps[0].classList.add('text-sorax', 'mb-1', 'ml-3');
  steps[0].innerHTML = `<span class="error-primary-normal">x<sub>${length_steps}</sub></span> = b<sub>${length_steps}</sub> = ${x[length_steps-1]}`;
  parent.append(steps[0]);

  for (let i = length_steps - 2; i >= 0; i--) {
    steps[i] = document.createElement('p');
    steps[i].classList.add('text-sorax', 'mb-1', 'ml-3');


    steps[i].innerHTML =
     `<span class="error-primary-normal">x<sub>${i+1}</sub></span> = a<sub>${i+1}</sub> * x<sub>${i+2}</sub> + b<sub>${i+1}</sub> = ${a[i].toFixed(rounding)} * ${x[i+1]} + ${b[i].toFixed(rounding)} = ${(a[i]*x[i+1]+b[i]).toFixed(rounding)}`;
     parent.append(steps[i]);

  }


}

/* === end === */





/* === Функция для вывода в блок отчета неизвестных Xi === begin */
function report(x, length) {
  var parent = document.querySelector('.report'); // к нему и будут добавлен блок родитель для параграфов

  var p = [];

  p[0] = document.createElement('p');
  p[0].classList.add('text-default', 'big', 'error-danger');
  p[0].innerHTML = 'Отчет: ';
  parent.append(p[0]);

  for (let i = 1; i < length; i++) {
    p[i] = document.createElement('p');
    p[i].classList.add('text-default', 'big', 'error-dark');
    p[i].innerHTML = `x<sub>${i} = </sub> ${x[i-1]} `;
    parent.append(p[i]);
  }

  // так как контенты вкладок расположены абсолютно, height: auto не поможет формировать высоту родителя
  // и что подделать???
  // --я помогу ведь это моя основная функиця P.S JavaScript
  setTimeout (function(){
    document.querySelector('.panel').style.height = (tabContent[0].offsetHeight + 10) + 'px';
  }, 1000);

}
/* === end === */



// для кнопка очистки чтобы кнопка очистить всегда находился в правом нижнем углу таблицы
document.querySelector('.btn-group').style.width = (document.querySelector('.body-cell').offsetWidth - 10) + 'px';

window.addEventListener(`resize`, event => {
  document.querySelector('.btn-group').style.width = (document.querySelector('.body-cell').offsetWidth - 10) + 'px !important';
  document.querySelector('.panel').style.height = (tabContent[0].offsetHeight + 10) + 'px !important';
}, false);

//для очисти ячеек и блок отчета
document.querySelector('.btn-clear').onclick = clearAll;

document.querySelector('.btn-submit').onclick = function () {
  console.time('time')
  var rounding = getValueSelected('selected-2'); // получение значение для округление

  let rows = document.querySelectorAll('.task-1 .row').length + 1; // получение длину колонок в каждом строке
  let input = conversion_input('input'); // преоброзование в массив всех input элементов
  let arr = array_chunk(input, rows); // преоброзование из массива в матрицу всех input элементов
  zeroingArray(arr);                // происвение нулей на undefined ячеек чтобы при вычисление не получить ошибку
  trans_matrix(arr);                // преоброзование в тип данных Float от string, для дальнешего вычисление
  var x = algorithm(arr, rounding); // получение неизвестных (Алгоритм)

  report(x, rows)  // выводит всех x(-ов) который нашли, принимают в параметр родительского блока для вложение
  /* После того как у нас все x известны можно подвести итог*/
  console.timeEnd('time');
  setTimeout (function(){
    document.querySelector('.panel').style.height = (tabContent[0].offsetHeight + 10) + 'px';
  }, 1000);
}

// так как дочерние элементы панель позицированный абсолютно то высота родителя равна нулю
// поэтому высота родитлею будет присвоено высота дочерного элемента который активно при загрузке страницы

setTimeout (function(){
  document.querySelector('.panel').style.height = (tabContent[0].offsetHeight + 10) + 'px';
}, 1000);
