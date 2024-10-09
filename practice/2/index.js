async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Сеть отвечает с ошибкой");
    }
    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error(error);
  }
}

function displayPosts(posts) {
  const tableBody = document
    .getElementById("postsTable")
    .querySelector("tbody");
  posts.forEach((post) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
            `;
    tableBody.appendChild(row);
  });
}

// Запускаем функцию по загрузке страницы
window.onload = fetchPosts;
