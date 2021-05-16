let slides = document.querySelectorAll('.slide-single'); // получаем коллекцию документов изображений 
let slider = []; //сюда будем сохранять src атрибуты изображений 
let timeOffset = 2000; //время анимации в мс. 
console.log(slides);

for (let i = 0; i < slides.length; i++) {
   slider[i] = slides[i].src; // сохраняем пути к изображениям
   slides[i].remove(); // удаляем из HTML
}
console.log(slider);

let step = 0; //шаг - определяет какую картинку показывать в текущий момент (по кругу) (контроль состояния слайдера)
let offset = 0; //смещение изображения

//фенкция отрисовки изображения (пока покажем только два слайда)
function draw() {
   console.log(step);

   let img = document.createElement('img'); // создаем элемент img
   img.src = slider[step]; //присваиваем картинке src (это ссылка на картину которая в зависимости от step будет меняться)
   img.classList.add('slide-single'); //добавляем картинке класс 

   img.style.left = offset * 245 + 'px'; //зададим картинке смещение
   img.style.transition = 'all ease ' + timeOffset / 1000 + 's';
   document.querySelector('#slider').appendChild(img);//получаем картинку и интегрируем ее внутрь блока


   //проверяем можно ли наращивать шаг
   if (step + 1 == slider.length) {
      step = 0;
   } else {
      step++;
   }
   offset = 1; // делаем смещение
}

//двигаем элементы
let flag = false;
function left() {
   //пока функция не отработала до конца (пока не закончилась анимация и удаление крайней картинки)
   //отключаем событие клика для документу
   //document.onclick = null;
   flag = false;
   let slideView = document.querySelectorAll('.slide-single'); //получим коллекцию видимых на данный момент картинок (в HTML)
   let offsetView = 0;
   for (let i = 0; i < slideView.length; i++) {
      slideView[i].style.left = offsetView * 245 - 245 + 'px';
      offsetView++;
   }

   //удаляем изображение после анимации 
   setTimeout(function () {
      slideView[0].remove(); //удаляем крайтнее левое изображение после смещения 
      draw(); // добавляем новый элемент
      //document.onclick = left;
      flag = true;
   }, timeOffset);

}

draw();
draw();
left(); //запускаем слайдер

setInterval(function () {
   if (flag) {
      left();
   }
}, timeOffset);

//для проверки вешаю событие клика по документу (потом убрать)
//document.onclick = left;




;
