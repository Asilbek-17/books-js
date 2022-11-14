const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".search-inp");
const elInputYear = document.querySelector(".search-year");
const elInputAuthor = document.querySelector(".search-author");
const elSelection = document.querySelector(".js-sort");
const elListBooks = document.querySelector(".js-list");

const Fragment = document.createDocumentFragment();
let i = 0;
function renderBooks(arr, node, regex = "") {
    elListBooks.innerHTML = "";
    
    arr.forEach(item => {
        const newItem = document.createElement("li");
        
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
        const newBtn = document.createElement("button");
        
        newImg.src = item.imageLink;
        newImg.alt = item.title;
        newImg.width = "300";
        newImg.height = "300";
        
        if(regex.source != "(?:)" && regex){
            newTitle.innerHTML = item.title.replace(regex, `<mark class="mark">${regex.source.toLowerCase()}</mark>`);
        }else{
            newTitle.textContent = item.title;
            
        }
        
        newText.textContent = item.author;
        newYearText.textContent = item.year;
        newPageText.textContent = item.pages;
        newLanguageText.textContent = item.language;
        
        newLink.textContent = "Wikipedia";
        newLink.href = item.link;
        newLink.target = "blank";
        newBtn.dataset.id = i++;
        
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
        newBtn.classList.add("book-btn");
        
        newItem.appendChild(newImg);
        newItem.appendChild(newTitle);
        newItem.appendChild(newText);
        newItem.appendChild(newBox);
        newItem.appendChild(newLink);
        newItem.appendChild(newBtn);
        
        newYearText.prepend(newYearspan);
        newPageText.prepend(newPagespan);
        newLanguageText.prepend(newLanguagespan);
        
        newBox.appendChild(newYearText);
        newBox.appendChild(newPageText);
        newBox.appendChild(newLanguageText);
        
        
        Fragment.appendChild(newItem);
    });
    
    node.appendChild(Fragment);
};

function sortBooks(arr, sortTypes) {
    if(sortTypes === "Az") {
        arr.sort((a , b) => {
            return String(a.title).toLowerCase().charCodeAt(0) - String(b.title).toLowerCase().charCodeAt(0) 
        });
    };
    
    if(sortTypes === "Za") {
        arr.sort((a , b) => {
            return String(b.title).toLowerCase().charCodeAt(0) - String(a.title).toLowerCase().charCodeAt(0) 
        });
    };
    
    if(sortTypes === "No") {
        arr.sort((a , b) => {
            return b.year - a.year
        });
    };
    
    if(sortTypes === "On") {
        arr.sort((a , b) => {
            return a.year - b.year
        });
    };
};

const elSelect = document.querySelector(".js-select");
const elOption = document.querySelector(".all-option");

const language = [];

books.forEach(itm => {
    if (! language.includes(itm.language)) {
        language.push(itm.language)
    }
})

const categorieFrag = document.createDocumentFragment();

language.forEach(i => {
    const newOption = document.createElement("option");
    
    newOption.value = i;
    newOption.textContent = i;
    
    categorieFrag.appendChild(newOption)
})

elSelect.appendChild(categorieFrag);



elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    
    const elInputValue = elInput.value.trim();
    const newInputAuthorValue = elInputAuthor.value.trim(); 
    const elSelectValue = elSelect.value.trim(); 
    const elInputYearValue = Number(elInputYear.value.trim());
    
    const regexTitle = new RegExp(elInputValue, "gi");
    const regexAuthor = new RegExp(newInputAuthorValue, "gi");
    
    
    const searchBooks = books.filter(item => {
        const searchInp = String(item.title).match(regexTitle) && String(item.author).match(regexAuthor) && (String(item.language).match(elSelectValue) || elSelectValue === "all") && ((elInputYearValue <= item.year) || (elInputYearValue == "" &&  item.year));
        
        
        return searchInp
    });
    
    if(searchBooks.length > 0) {
        sortBooks(searchBooks, elSelection.value)
        renderBooks(searchBooks, elListBooks, regexTitle);
    } else {
        elListBooks.innerHTML = "Books not found !!!"
    }
})

renderBooks(books, elListBooks)
