const form = document.getElementById("blog-form");
const fileInput = document.getElementById("upload-file");
const contentField = document.getElementById("content");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      contentField.value = reader.result;
    };
    reader.readAsText(file);
  }
});

form.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = contentField.value;
  const category = document.getElementById("category").value;

  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, category })
  });
  const data = await res.json();
  if (data.status === "saved") {
    window.location.href = `/post.html?id=${data.id}`;
  }
};
