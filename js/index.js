// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input'); //поле с min весом
const maxWeight = document.querySelector('.maxweight__input'); //поле с max весом

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);


/*** ОТОБРАЖЕНИЕ ***/

// Назначение цветов по классам из файла CSS
function colorToClass(color) {
  return color === 'фиолетовый' ? 'fruit_violet' : 
    color === 'зелёный' ? 'fruit_green' :
    color === 'розово-красный' ? 'fruit_carmazin' :
    color === 'жёлтый' ? 'fruit_yellow' :
    color === 'светло-коричневый' ? 'fruit_lightbrown' : '';
};


const warning = (text) =>{
  warningWrapper.innerText = text;
  warningWrapper.classList.add('warning__active');
  setTimeout(() => {
    warningWrapper.classList.remove('warning__active');
  }, 1500);
};


// отрисовка карточек
// const display = () => {
//   fruitsList.textContent = '';

//   fruits.forEach((fruit, i) => {
//     const cC = colorToClass(fruit.color);
//     const li = document.createElement('li');

//     li.classList.add('fruit__item', cC);

//     li.innerHTML = `
//       <div class="fruit__info">
//         <div>index: ${i + 1}</div>
//         <div>kind: ${fruit.kind}</div>
//         <div>color: ${fruit.color}</div>
//         <div>weight (кг): ${fruit.weight}</div>
//       </div>
//     `;

//     fruitsList.appendChild(li);
//   }),
// };

const display = () => {
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    const colorClass = colorToClass(fruits[i].color);
 
    let newLi = document.createElement('li');
    newLi.className = `fruit__item ${colorClass}`;

    newLi.innerHTML = `<div class="fruit__info">
      <div>index: ${i + 1}</div>
      <div>kind: ${fruits[i].kind}</div>
      <div>color: ${fruits[i].color}</div>
      <div>weight (кг): ${fruits[i].weight}</div>
    </div>`;

    fruitsList.appendChild(newLi);
  }
};


// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
// const shuffleFruits = () => {
//   let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
//   while (fruits.length > 0) {
//     // TODO: допишите функцию перемешивания массива
//     //
//     // Подсказка: находим случайный элемент из fruits, используя getRandomInt
//     // вырезаем его из fruits и вставляем в result.
//     // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
//     // (массив fruits будет уменьшатся, а result заполняться)
//     const i = getRandomInt(0, fruits.length - 1) 
//     result.push(fruits[i]);
//     fruits.splice(i, 1); 
//   }

//   fruits = result;
// };

const shuffleFruits = () => {
  let result = [];
  while (fruits.length > 0) {
    const i = getRandomInt(0, fruits.length - 1);

    result.push(fruits[i]);
    fruits.splice(i, 1);
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива

const filterFruits = () => {
  fruits = fruits.filter((item) => {
    return (item.weight >= minWeight.value) && (item.weight <= maxWeight.value);
  });
};


filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

// const comparationColor = (a, b) => {
//   // TODO: допишите функцию сравнения двух элементов по цвету
// };

// const comparationColor = (a, b) => {
//   if (colorToClass(a.color) > colorToClass(b.color)) {
//     return 1;
//   } else if (colorToClass(a.color) < colorToClass(b.color)) {
//     return -1;
//   }
//   return 0;
// };

const comparationColor = (a, b) => {
const stringToCode = (str) => {
  let code = "";
  [...str].forEach(char => {         
    code += char.charCodeAt(0);  
  });
  return parseInt(code);
};
  const codeA = stringToCode(a);
  const codeB = stringToCode(b);

  if (codeB < codeA) return true;
};

// const sortAPI = {
//   bubbleSort(arr, comparation) {
//     // TODO: допишите функцию сортировки пузырьком
//   },

//   const sortAPI = {
//     bubbleSort(arr, comparation) {
//       for (let i = arr.length; i > 0; i--) {
//         for (let j = 0; j < i; j++) {
//           if (comparation(arr[j], arr[j + 1]) > 0) {
//             const temp = arr[j];
//             arr[j] = arr[j + 1];
//             arr[j + 1] = temp;
//           }
//         }
//       }
//     },
//   },
// },

  const sortAPI = {
    bubbleSort(arr, comparation) {
      // TODO: допишите функцию сортировки пузырьком
  
      //( VAL дописываем функцию сортировки пузырьком bubbleSort
      const n = arr.length;
  
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1; j++) {
          const a = arr[j].color;
          const b = arr[j + 1].color;
  
          if (comparation(a, b)) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
    },



  // quickSort(arr, comparation) {
  //   // TODO: допишите функцию быстрой сортировки
  // },

  // const quickSort = (arr) => {
  //   if (arr.length <= 1) {
  //     return arr;
  //   }
  
  //   const pivot = arr[0];
  //   let left = [];
  //   let right = [];
  
  //   for (let i = 1; i < arr.length; i++) {
  //     if (comparationColor(arr[i], pivot) === -1) {
  //       left.push(arr[i]);
  //     } else {
  //       right.push(arr[i]);
  //     }
  //   }
  quickSort(arr) {
    // TODO: допишите функцию быстрой сортировки

    //( VAL дописываем функцию быстрой сортировки
    const n = arr.length;

    if (n < 2) {
      return arr;
    }

    const pivot = arr[Math.floor(n / 2)].color;

    let left = [], center = [], right = [];

    arr.forEach(elem => {
      if (elem.color == pivot) { center.push(elem) }
      else if ((elem.color != pivot) && (elem.color.length >= pivot.length)) { right.push(elem) }
      else if ((elem.color != pivot) && (elem.color.length < pivot.length)) { left.push(elem) }
    });

    return fruits = [...sortAPI.quickSort(left), ...center, ...sortAPI.quickSort(right)]
  },
  //   return quickSort(left).concat([pivot], quickSort(right));
  // },



  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

// sortChangeButton.addEventListener('click', () => {
//   // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
// });

sortChangeButton.addEventListener('click', () => {
  sortKindLabel.innerText = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
});

// sortActionButton.addEventListener('click', () => {
//   // TODO: вывести в sortTimeLabel значение 'sorting...'
//   const sort = sortAPI[sortKind];
//   sortAPI.startSort(sort, fruits, comparationColor);
//   display();
//   // TODO: вывести в sortTimeLabel значение sortTime
// });

sortActionButton.addEventListener('click', () => {
sortTimeLabel.innerText = 'sorting...';

  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);

  display();
  sortTimeLabel.innerText = `sort time: ${sortTime}`;
});


/*** ДОБАВИТЬ ФРУКТ ***/

// addActionButton.addEventListener('click', () => {
//   // TODO: создание и добавление нового фрукта в массив fruits
//   // необходимые значения берем из kindInput, colorInput, weightInput
//   display();
// });

addActionButton.addEventListener('click', () => {
  if ((kindInput.value == "") || (weightInput.value == "")) {
    warning('Напишите наименование фрукта, укажите вес и цвет');
    return false;
  };

  const newFruit = {
    kind: kindInput.value,
    color: colorInput.value,
    weight: weightInput.value
  };

  fruits.push(newFruit);

  display();
});
newFruit(kindInput.value, colorInput.value, weightInput.value);