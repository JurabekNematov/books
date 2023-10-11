var elForm = document.querySelector(".js-form");
var elInput = document.querySelector(".js-input");
var elSelect = document.querySelector(".js-select");
var elList = document.querySelector(".js-list");


function renderBooks(docs){
  elList.innerHTML = null;
  var fragment = document.createDocumentFragment();
  for (const item of docs) {
    var bookItem = document.createElement("li");
    bookItem.classList.add("book-item");
    var bookImg = document.createElement("img");
    bookImg.classList.add("book-img");
    var bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    var bookWriter = document.createElement("cite");
    bookWriter.classList.add("book-writer");
    var bookBox = document.createElement("div");
    bookBox.classList.add("book-box");
    var bookYear = document.createElement("time");
    bookYear.classList.add("book-year");
    var bookPage = document.createElement("span");
    bookPage.classList.add("book-pages");
    var bookLang = document.createElement("p");
    bookLang.classList.add("book-lang");
    var bookLink = document.createElement("a");
    bookLink.classList.add("book-link");

    bookImg.src = item.imageLink;
    bookImg.alt = item.title;
    bookTitle.textContent = item.title;
    bookWriter.textContent = item.author;
    bookYear.textContent = item.year;
    bookPage.textContent = item.pages;
    bookLang.textContent = item.language;
    bookLink.textContent = "Wikipedia"

    bookItem.append(bookImg,bookTitle,bookWriter,bookBox,bookYear,bookPage,bookLang,bookLink);
    bookBox.append(bookYear,bookPage,bookLang);
    fragment.appendChild(bookItem);
  }
  elList.appendChild(fragment);
}

function selectFunc(){
  var newArr = [];

  books.forEach(items =>{
    items.language.split("|").forEach(lang =>{
      if (!newArr.includes(lang)){
        newArr.push(lang)
      }
    })
  });

  newArr.forEach(opt=> {
    var bookOption = document.createElement("option");
    bookOption.textContent = opt;
    bookOption.value = opt;
    elSelect.appendChild(bookOption);
  });
}
selectFunc();

elForm.addEventListener("submit", function(evt){
  evt.preventDefault();

  var inputValue = elInput.value;
  var selectValue = elSelect.value;
  var newRegexp = new RegExp(inputValue, "gi");

  var arr = books.filter(preFunc=> {
    return preFunc.title.match(newRegexp) && (preFunc.language.includes(selectValue || selectValue === "All"));
  }) 

  if(arr.length > 0){
    return renderBooks(arr);
  } else {
    elList.textContent = "This book is not found !"
  }
});
renderBooks(books);