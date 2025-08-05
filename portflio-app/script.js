document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("add-section-form");
  const sectionTitle = document.getElementById("section-title");
  const sectionContent = document.getElementById("section-content");
  const addSectionArea = document.getElementById("add-section");

  let savedSections = JSON.parse(localStorage.getItem("customSections")) || [];

  // Load saved sections
  savedSections.forEach((section, index) => {
    insertSection(section.title, section.content, index);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = sectionTitle.value;
    const content = sectionContent.value;

    savedSections.push({ title, content });
    localStorage.setItem("customSections", JSON.stringify(savedSections));

    insertSection(title, content, savedSections.length - 1);

    form.reset();
  });

  function insertSection(title, content, index) {
    const newSection = document.createElement("section");
    newSection.innerHTML = `
      <h2 contenteditable="false">${title}</h2>
      <p contenteditable="false">${content}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    // Delete button
    newSection.querySelector(".delete-btn").addEventListener("click", () => {
      savedSections.splice(index, 1);
      localStorage.setItem("customSections", JSON.stringify(savedSections));
      location.reload();
    });

    // Edit button
    newSection.querySelector(".edit-btn").addEventListener("click", (e) => {
      const h2 = newSection.querySelector("h2");
      const p = newSection.querySelector("p");

      if (e.target.textContent === "Edit") {
        h2.contentEditable = true;
        p.contentEditable = true;
        h2.focus();
        e.target.textContent = "Save";
      } else {
        h2.contentEditable = false;
        p.contentEditable = false;
        savedSections[index] = {
          title: h2.textContent,
          content: p.textContent
        };
        localStorage.setItem("customSections", JSON.stringify(savedSections));
        e.target.textContent = "Edit";
      }
    });

    addSectionArea.before(newSection);
  }
});
