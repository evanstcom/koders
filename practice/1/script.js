const modal = document.querySelector("#modal");
document
  .querySelector("#open-modal")
  .addEventListener("click", () => {
    modal.classList.add("active");
  });

document
  .querySelector("#close-modal")
  .addEventListener("click", (e) => {
    modal.classList.remove("active");
    e.preventDefault();
  });

const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result; // Устанавливаем источник для изображения
      preview.style.display = "block"; // Показываем изображение
    };
    reader.readAsDataURL(file); // Читаем файл как URL
  }
});

document.getElementById("clearButton").addEventListener("click", function () {
  fileInput.value = ""; // Очистка значения input
  preview.src = "";
  preview.style.display = "none";
});


//маска и валидация
const phoneInput = document.getElementById('phone');
const form = document.getElementById('form');
const errorMessage = document.getElementById('error-message');

// Функция для установки маски
phoneInput.addEventListener('input', function() {
  errorMessage.textContent = '';
  phoneInput.classList.remove('error');
  let inputValue = this.value.replace(/\D/g, '')// убираем все лишнее
  if (inputValue.startsWith('7')){
    inputValue = inputValue.substring(1); //если первая 7 - удаляем
  }
  let maskedValue = ''; //чистим маску

  // формируем маску
  if (inputValue.length > 0) {
    maskedValue = '+7 (' + inputValue.substring(0, 3);
    if (inputValue.length > 3) {
      maskedValue += ') ' + inputValue.substring(3, 6);
    }
    if (inputValue.length > 6) {
      maskedValue += '-' + inputValue.substring(6, 8);
    }
    if (inputValue.length > 8) {
      maskedValue += '-' + inputValue.substring(8, 10);
    }
  }

  this.value = maskedValue; // Установка обновленного значения в инпут
});

// Функция для валидации при отправке формы
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const rawValue = phoneInput.value.replace(/\D/g, '');

  // Валидация номера
  if (rawValue.length === 11 && rawValue.startsWith('7')) {
    errorMessage.textContent = '';
    form.submit();
  } else {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth"
    });
    errorMessage.textContent = 'Пожалуйста, введите корректный номер телефона^.';
    phoneInput.classList.add('error');
  }
});
