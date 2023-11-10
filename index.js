'use strict';

const inputField = document.querySelector('.form__input');
const btnSquare = document.querySelector('.form__btn--square');
const btnTriangle = document.querySelector('.form__btn--triangle');
const btnCircle = document.querySelector('.form__btn--circle');
const shapeContainer = document.querySelector('.shape-container');

let lastSelected;

function getRandomNumber(min = 0, max = 100) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPosition() {
   return {
      x: getRandomNumber(0, 50),
      y: getRandomNumber(0, 50),
   };
}

function getRandomSize() {
   return getRandomNumber(50, 200) / 100;
}

function clearField() {
   inputField.value = '';
   inputField.blur();
}

function getMarkup(shape) {
   const size = getRandomSize();
   const position = getRandomPosition();

   const x = getRandomNumber(0, 1) ? 'left' : 'right';
   const y = getRandomNumber(0, 1) ? 'top' : 'bottom';

   return `<div style="transform-origin: ${y} ${x}; transform: scale(${size}); ${y}: ${position.y}%; ${x}: ${position.x}%;" class="shape shape__${shape}"></div>`;
}

function generateShapes(shape) {
   const numberOfShapes = inputField.value;

   for (let index = 0; index < numberOfShapes; index++) {
      shapeContainer.insertAdjacentHTML('beforeend', getMarkup(shape));
   }

   clearField();
}

btnSquare.addEventListener('click', function (e) {
   e.preventDefault();

   generateShapes('square');
});

btnTriangle.addEventListener('click', function (e) {
   e.preventDefault();

   generateShapes('triangle');
});

btnCircle.addEventListener('click', function (e) {
   e.preventDefault();

   generateShapes('circle');
});

shapeContainer.addEventListener('click', function (e) {
   const target = e.target;

   if (!target.classList.contains('shape')) {
      if (lastSelected) {
         lastSelected.classList.remove('shape--active');
         lastSelected = '';
      }

      return;
   }

   if (lastSelected) lastSelected.classList.remove('shape--active');

   lastSelected = target;
   lastSelected.classList.add('shape--active');
});

shapeContainer.addEventListener('dblclick', function (e) {
   const target = e.target;

   if (!target.classList.contains('shape')) return;

   lastSelected = '';

   target.remove();
});