document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");
  const title = params.get("title");
  const readme = params.get("readme");

  // Set the project title
  // document.getElementById('project-title').textContent = decodeURIComponent(title);

  // Fetch the README.md file based on the project index
  fetch(`${readme}`)
    .then((response) => response.text())
    .then((markdown) => {
      // Use the marked library to convert markdown to HTML
      const readmeHTML = marked.parse(markdown);
      document.getElementById("readme-content").innerHTML = readmeHTML;
    })
    .catch((error) => console.error("Error loading README:", error));
});
