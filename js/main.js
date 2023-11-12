let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchbytitle = document.getElementById("searchbytitle");
let searchbycategory = document.getElementById("searchbycategory");
let total = document.getElementById("total");
let tbody = document.getElementById("tbody");
let mood = "create";
let tmp;
let moodsearch = 'title';

//get total

function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "rgb(165, 52, 52)";
    total.innerHTML = "";
  }
}

// create product
let products;

if (window.localStorage.product) {
  products = JSON.parse(window.localStorage.product);
} else {
  products = [];
}

create.onclick = function () {
    if (title.value !="" && +count.value < 100 && price.value !="" ) {
        
   
  let newprod = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === "create") {
    if (newprod.count > 1) {
      for (let i = 0; i < newprod.count; i++) {
        products.push(newprod);
      }
    } else {
      products.push(newprod);
    }
  } else {
    products[tmp] = newprod;
    mood = "create";

    create.innerHTML = "create";
    count.style.display = "block";
  }

  window.localStorage.setItem("product", JSON.stringify(products));
  clear();
  showdata();
};
}
showdata();
// clear input

function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  ads.value = "";
  count.value = "";
  total.innerHTML = "";
  category.value = "";
}
// read data
function showdata() {
  gettotal();
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
       
       <tr>
       <th scope="row">${i + 1}</th>
       <td>${products[i].title}</td>
       <td>${products[i].price}</td>
       <td>${products[i].ads}</td>
       <td>${products[i].taxes}</td>
       <td>${products[i].discount}</td>
       <td>${products[i].total}</td>
       <td>${products[i].category}</td>
     
       <td>    
           <button onclick="updatedata(${i})" id="update" class="btn btn-info">UPDATE</button>
       </td>
       <td>   
            <button onclick="deletedata(${i})" id="delete" class="btn btn-info">DELETE</button>
       </td>
     </tr>
       `;
  }

  tbody.innerHTML = table;
  let deleteall = document.getElementById("deleteall");

  if (products.length > 0) {
    deleteall.innerHTML = `
        <button onclick="deleteAll()" class="btn btn-warning px-5 mt-3">DELETEALL ( ${products.length} ) </button>
        `;
  } else deleteall.innerHTML = "";
}

// delete data

function deletedata(id) {
  products.splice(id, 1);
  window.localStorage.product = JSON.stringify(products);
  showdata();
}

// delete alldata

function deleteAll() {
  products.splice(0);

  window.localStorage.clear();
  // window.localStorage.product= JSON.stringify(products);
  showdata();
}

// update data

function updatedata(id) {
  title.value = products[id].title;
  price.value = products[id].price;
  taxes.value = products[id].taxes;
  ads.value = products[id].ads;
  discount.value = products[id].discount;
  category.value = products[id].category;
  gettotal();

  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  tmp = id;
}


// search
    

 
function searchmood(id){
if (id === 'searchbytitle') {
    moodsearch='title';

} else {
    moodsearch = 'category';
}
search.placeholder='search by ' + moodsearch;
search.focus();
search.value="";
showdata();
}


function searchdata(value) {
    let table = "";

  for (let i = 0; i < products.length; i++) {
    if (moodsearch == "title") {
      if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
       
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
      
        <td>    
            <button onclick="updatedata(${i})" id="update" class="btn btn-info">UPDATE</button>
        </td>
        <td>   
             <button onclick="deletedata(${i})" id="delete" class="btn btn-info">DELETE</button>
        </td>
      </tr>
        `;
      }
    } 
    else {
        if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
            table += `
           
            <tr>
            <th scope="row">${i + 1}</th>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
          
            <td>    
                <button onclick="updatedata(${i})" id="update" class="btn btn-info">UPDATE</button>
            </td>
            <td>   
                 <button onclick="deletedata(${i})" id="delete" class="btn btn-info">DELETE</button>
            </td>
          </tr>
            `;
          }
    }
    tbody.innerHTML = table;

  }
}