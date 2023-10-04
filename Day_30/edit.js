const btnSave = document.querySelector(".btn-save"),
contextmenu = document.querySelector(".contextmenu"),
contextmenuBtns = contextmenu.querySelectorAll("button"),
editBtns = document.querySelectorAll(".doc-editor-edit button"),
pickColor = document.querySelector(".doc-editor-edit input"),
inputFileName = document.querySelector(".input-file-name"),
docEditorText = document.querySelector(".doc-editor-text"),
numberCharacter = document.querySelector(".doc-editor-character span"),
numberWord = document.querySelector(".doc-editor-word span"),
notify = document.querySelector(".notify");

window.addEventListener("load", function () {
  docEditorText.focus();
});


contextmenuBtns.forEach(function (element) {
  element.addEventListener("mousedown", function (e) {
    e.preventDefault();
  });

  element.addEventListener("mouseup", function () {
    if (element.classList.contains("btn-new")) {
      docEditorText.innerText = "";
      numberCharacter.innerText = 0;
      numberWord.innerText = 0;
    } else if (element.classList.contains("btn-txt")) {
      const blob = new Blob([docEditorText.innerText], { type: "text/plain" });
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      !inputFileName.value
        ? (link.download = "txt")
        : (link.download = inputFileName.value);
      link.href = fileUrl;
      link.click();
    } else if (element.classList.contains("btn-pdf"))
      html2pdf().from(docEditorText).save(inputFileName.value);

    btnSave.blur();
  });
});

// Đếm số ký tự | Đếm số từ
docEditorText.addEventListener("input", function () {
  let text = docEditorText.innerText.trim();
  text = text.replace(/\s+/g, " ");
  const textNoSpace = text.replace(/\s+/g, "");
  const arrText = text.split(" ");

  arrText[0].length === 0
    ? (numberWord.innerText = 0)
    : (numberWord.innerText = arrText.length);
  numberCharacter.innerText = textNoSpace.length;
});