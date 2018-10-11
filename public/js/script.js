// Add variables that store DOM elements you will need to reference and/or manipulate
let currentPage=1;
const recordsPerPage=6; //only 10 book record will be displayed for each page
let allRecords =  document.querySelectorAll('tbody tr'); //select all books records with tbody
let totalNumOfRecord = allRecords.length;
const body = document.querySelector('body');
const table=document.querySelector('table');
let filterCollection = allRecords;// when search button is clicked, set this variable to corresponding records
const errorMessage=document.createElement('h3');


// Create a function to hide all of the items in the list except for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four
/**
 * First, I am going to hide all records from the page. And call the function to show the required records.
 */
/**
 * Function getNumOfPages take no parameter and return the total number of pages needed based on
 * the total number of student records and records allowed for each page
 * @returns {int}
 */
const getNumOfPages =() =>{
  return Math.ceil(totalNumOfRecord/recordsPerPage);
};

/**
 * Need to display the list of page numbers
 * Note: each time the pageInertHTML function is called, the eventListener applied previously will not be carrier together
 */
const pageInsertHTML= (pageNumber) =>{
  let contentHTML =`<ul>`;
  for (let i=0; i<pageNumber; i++){
    contentHTML+=`<li><a href="#">${i+1}</a></li>`;
  }
  contentHTML+=`</ul>`;
  return contentHTML;
};

const pagination=document.createElement('div');
pagination.className = 'pagination';
pagination.innerHTML= pageInsertHTML(getNumOfPages());
body.appendChild(pagination);//append the pagination links as the last child element of body


/**
 * Function hidePreviousPages will check if the current page is 1, if the current page is 1. The function do nothing.
 * Else, the function will hide all student records which should displayed on previous pages
 */
const hidePreviousPages = (currentPage, collection) =>{
  if (currentPage !== 1){
    for (let i=0; i<(currentPage-1)*recordsPerPage; i++){
      collection[i].style.display='none';
    }
  }
};

/**
 * Function hideNextPages will check if the current page is the last page, if the current page is the last page.
 * The function do nothing. Else, the function will hide all student records which should displayed on next pages
 */
const hideNextPages = (currentPage, collection) =>{
  for (let i=currentPage*recordsPerPage; i<collection.length; i++){
    collection[i].style.display='none';
  }
};
// resetRecord will take collection as parameter and display all the elements from the collection
const resetRecords=(collection) =>{
  for (let i=0;i<collection.length;i++){
    collection[i].style.display = '';
  }
};
//hideAllRecords will hide all the elements from the allRecords
const hideAllRecords=() =>{
  for (let i=0;i<totalNumOfRecord;i++){
    allRecords[i].style.display = 'none';
  }
};

/**
 * make class active
 */
const assignActive =(activeNo)=>{
  let activePage = document.querySelectorAll('.pagination ul li a');
  for (let i=0; i<activePage.length; i++){
    if ((i+1) === activeNo){
      activePage[i].className ='active';
    } else{
      activePage[i].className= 'none';
    }
  }
};

/**
 * printRecords function
 */
const printRecords =()=>{
  resetRecords(filterCollection);
  hidePreviousPages(currentPage,filterCollection);
  hideNextPages(currentPage,filterCollection);
};

// Add functionality to the pagination buttons so that they show and hide the correct items
let selected = document.querySelector('.pagination ul');
selected.addEventListener('click', (event) => {
  if (event.target.tagName ==='A'){
    let pageNo=parseInt(event.target.textContent);
    assignActive(pageNo);
    currentPage=pageNo;
    printRecords();
  }
  event.stopPropagation();
});

// Initialize when page loads up
hidePreviousPages(currentPage,allRecords);
hideNextPages(currentPage,allRecords);
assignActive(currentPage);


/**
 * Adding search input and button into DOM
 */
const searchDiv=document.createElement('div');
body.insertBefore(searchDiv,body.childNodes[0]);
searchDiv.className='book-search';
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search for books...';
searchDiv.append(searchInput)
let searchButton = document.createElement('button');
searchButton.innerText='Search';
searchDiv.appendChild(searchButton);

/**
 * Adding search functionality
 */
let matchCount=0;//global variable, the number of matching records
let searchHandler = (searchTerm) =>{
  for (let i=0; i<totalNumOfRecord; i++){
    if (allRecords[i].innerText.toLowerCase().includes(searchTerm)){
      allRecords[i].style.display='';
      matchCount++;
    }
  }//end of for loop
  filterCollection = body.querySelectorAll("tr[style='']");
}//end of searchHandler

/**
 *
 */
searchButton.addEventListener('click',(event)=>{
  // first, all records need to be hide
  hideAllRecords();
  // next, searchHandler function is called
  searchHandler(searchInput.value.toLowerCase());
  if (matchCount === 0){
    errorMessage.style.display='block';
    errorMessage.className= 'error-message';
    errorMessage.innerText = "Opps, we do not have that book.";
    table.appendChild(errorMessage);
    console.log('There is no matching records...')
    pagination.innerHTML=pageInsertHTML(1);
  } else {
    errorMessage.style.display='none';
    pagination.innerHTML=pageInsertHTML(Math.ceil(matchCount/recordsPerPage));
  }//end of else statement
  //assign default active pagination to 1
  assignActive(1);
  // filter and only show first 10 records in search results
  hidePreviousPages(1,filterCollection);
  hideNextPages(1,filterCollection);
  let newSelected=document.querySelector('.pagination ul');
  newSelected.addEventListener('click',(event)=>{
    if (event.target.tagName ==='A') {
      let newPageNo = parseInt(event.target.textContent);
      console.log(newPageNo);//bug testing
      assignActive(newPageNo);
      currentPage=newPageNo;
      printRecords();
    }
  });
  //reset match count
  console.log(searchInput.value);
  matchCount=0;//need to reset this number for another search
  searchInput.value='';//reset the input text
  event.stopPropagation();
});




