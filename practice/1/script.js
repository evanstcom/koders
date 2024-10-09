const modal = document.querySelector("#modal");
console.log(modal);
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
