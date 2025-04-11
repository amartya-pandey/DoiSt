document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/blogs")
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById("posts-container");
      posts.forEach(post => {
        const article = document.createElement("article");
        article.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
          <a href="/post.html?id=${post.id}">Read more</a>
        `;
        container.appendChild(article);
      });
    });
});
