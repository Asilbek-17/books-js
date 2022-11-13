const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".search-inp");
const elListBooks = document.querySelector(".js-list");

const Fragment = document.createDocumentFragment();

books.forEach(item => {
    const newItem = document.createElement("li")
    const newTitle = document.createElement("h2");
    const newImg = document.createElement("img");
    const newText = document.createElement("p");
    const newBox = document.createElement("div");
    const newYearText = document.createElement("p");
    const newPageText = document.createElement("p");
    const newLanguageText = document.createElement("p");
    const newYearspan = document.createElement("span");
    const newPagespan = document.createElement("span");
    const newLanguagespan = document.createElement("span");
    const newLink = document.createElement("a");

    newImg.src = item.imageLink;
    newImg.alt = item.title;
    newImg.width = "300";
    newImg.height = "300";
    newTitle.textContent = item.title;
    newText.textContent = item.author;
    newYearText.textContent = item.year;
    newPageText.textContent = item.pages;
    newLanguageText.textContent = item.language;

    newLink.textContent = "Wikipedia";
    newLink.href = item.link;
    newLink.target = "blank";

    newItem.classList.add("item");

    newImg.classList.add("book-img");

    newTitle.classList.add("book-title");
    newText.classList.add("book-text");

    newBox.classList.add("book-box");

    newYearText.classList.add("year-text");
    newPageText.classList.add("page-text");
    newLanguageText.classList.add("language-text");

    newYearspan.classList.add("year-icon");
    newPagespan.classList.add("page-icon");
    newLanguagespan.classList.add("language-icon");

    newLink.classList.add("book-link");



    newItem.appendChild(newImg);
    newItem.appendChild(newTitle);
    newItem.appendChild(newText);
    newItem.appendChild(newBox);
    newItem.appendChild(newLink);

    newYearText.prepend(newYearspan);
    newPageText.prepend(newPagespan);
    newLanguageText.prepend(newLanguagespan);

    newBox.appendChild(newYearText);
    newBox.appendChild(newPageText);
    newBox.appendChild(newLanguageText);
    
    

    Fragment.appendChild(newItem);
});

elListBooks.appendChild(Fragment);