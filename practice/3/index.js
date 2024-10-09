let posts = [];
let sort = { id: true, title: true, body: true }; // сортировка по умолчанию

document.getElementById("search").addEventListener("input", filterTable); // обработчик для инпута
const searchValue = document.getElementById("search"); // Получаем значение инпута
document.querySelectorAll("#data-table th").forEach((th) => {
  //обработчик для заголовков таблицы
  th.addEventListener("click", () => {
    const column = th.dataset.sort;
    sortTable(column);
  });
});

// Функция для загрузки данных
async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts = await response.json();
  renderTable(posts);
}

// Функция для отображения таблицы
function renderTable(data) {
  const tbody = document.querySelector("#data-table tbody");
  tbody.innerHTML = "";
  data.forEach((post) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
            `;
    tbody.appendChild(row);
  });
}

// Функция для сортировки таблицы
function sortTable(column) {
  const sortedPosts = [...posts].sort((a, b) => {
    if (sort[column]) {
      return a[column] < b[column] ? -1 : 1;
    } else {
      return a[column] > b[column] ? -1 : 1;
    }
  });
  sort[column] = !sort[column]; // Меняем направление сортировки
  renderTable(sortedPosts);
}

// фильтруем посты по инпуту
function filterTable() {
  const search = searchValue.value.toLowerCase(); // Получаем значение инпута
  if (search.length >= 3) {
    const filteredPosts = posts.filter(
      //фильтруем посты по заголовку или содержимому
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.body.toLowerCase().includes(search)
    );
    renderTable(filteredPosts); //выводим посты
  } else {
    renderTable(posts);
  }
}

// Загружаем данные при загрузке страницы
window.onload = fetchPosts;
