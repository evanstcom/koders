const modal = document.querySelector("#modal");
const openModal = document
  .querySelector("#open-modal")
  .addEventListener("click", () => {
    modal.classList.add("active");
  });

const closeModal = document
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

const phoneNumber = document.getElementById("phoneNumber");

/* phoneNumber.addEventListener("input", phoneMask);

function phoneMask() {
  console.log(phoneNumber.value);
  let value = phoneNumber.value.replace(/\D/g, ""); // Удалить все, кроме цифр
  // Применить формат
  if (value.length > 0) {
    value = "+7 (" + value;
  }
  if (value.length > 7) {
    value = value.slice(0, 7) + ") " + value.slice(7);
  }
  if (value.length > 12) {
    value = value.slice(0, 12) + "-" + value.slice(12);
  }
  if (value.length > 15) {
    value = value.slice(0, 15) + "-" + value.slice(15);
  }
  console.log(value);
  phoneNumber.value = value;
} */

const submitButton = document
  .getElementById("send-form")
  .addEventListener("click", sendForm);

function sendForm() {
  const submit = validatePhone();
  if (!submit) {
    alert(`Номер телефона невалидный`);
  }
}

function validatePhone() {
  const phoneRegex =
    /^\+7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$|^8\s?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$|^7\d{10}$/;
  if (phoneRegex.test(phoneNumber.value)) {
    console.log(`"${phoneNumber.value}" - Номер телефона валидный`);
    return true;
  } else {
    console.log(`"${phoneNumber.value}" - Номер телефона невалидный`);
    return false;
  }
}
