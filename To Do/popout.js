// create-todo -> create todo button onclick open ".new-item"
// new-item -> if button pressed it save and hide "new-item"

// TO toggle the create new item block
document.querySelector('.create-todo').addEventListener('click', function () {
  const newItem = document.querySelector('.new-item');
  if (newItem.style.display == 'block') {
    document.querySelector('.new-item').style.display = 'none';
  } else {
    document.querySelector('.new-item').style.display = 'block';
  }
});

// for enter key on input
document.querySelector('.new-item').addEventListener('keyup', function (e) {
  if (e.code === 'Enter') {
    document.querySelector('.new-item button').click();
  }
});

// listen to save button
document
  .querySelector('.new-item button')
  .addEventListener('click', function () {
    var itemName = document.querySelector('.new-item input').value;
    if (itemName != '') {
      var itemStorage = localStorage.getItem('todo-items');
      var itemArr = JSON.parse(itemStorage);
      if (itemArr == null) {
        var itemArr = [];
      }
      console.log(itemArr);
      itemArr.push({ item: itemName, status: 0 });
      saveItems(itemArr);
      fetchItems();
      document.querySelector('.new-item input').value = '';
      document.querySelector('.new-item').style.display = 'none';
    }
  });

function fetchItems() {
  const itemsList = document.querySelector('ul.todo-items');
  itemsList.innerHTML = '';
  var newItemHTML = '';

  try {
    var itemStorage = localStorage.getItem('todo-items');
    var itemArr = JSON.parse(itemStorage);

    for (let i = 0; i < itemArr.length; i++) {
      var status = '';

      if (itemArr[i].status == 1) {
        status = 'class=done';
      }
      newItemHTML += `<li data-itemindex="${i}" ${status} >
       <span class="item" >${i+1}. => ${itemArr[i].item}</span>
         <div> 
         <span class="itemComplete">✅</span> 
         <span class="itemDelete">🗑️</span> 
         </div> 
         </li>`;
    }
    itemsList.innerHTML = newItemHTML;

    var itemsLists = document.querySelectorAll('ul li');
    for (let i = 0; i < itemsLists.length; i++) {
      itemsLists[i]
        .querySelector('.itemComplete')
        .addEventListener('click', function () {
          var index = this.parentNode.parentNode.dataset.itemindex;
          itemComplete(index);
        });
      itemsLists[i]
        .querySelector('.itemDelete')
        .addEventListener('click', function () {
          var index = this.parentNode.parentNode.dataset.itemindex;
          itemDelete(index);
        });
    }
  } catch (e) {
    console.log(e);
  }
}

// Function to mark item complete
function itemComplete(index) {
  var itemStorage = localStorage.getItem('todo-items');
  var itemArr = JSON.parse(itemStorage);

  if (itemArr[index].status == 0) {
    itemArr[index].status = 1;

    saveItems(itemArr);
    document.querySelector(
      'ul.todo-items li[data-itemindex = "' + index + '"]'
    ).className = 'done';
  }else{
    itemArr[index].status = 0;
    saveItems(itemArr);
    document.querySelector(
      'ul.todo-items li[data-itemindex = "' + index + '"]'
    ).classList.remove('done');
  }
}

// Function to delete item
function itemDelete(index) {
  var itemStorage = localStorage.getItem('todo-items');
  var itemArr = JSON.parse(itemStorage);

  itemArr.splice(index, 1);
  saveItems(itemArr);

  document
    .querySelector('ul.todo-items li[data-itemindex = "' + index + '"]')
    .remove();
}

// Save item in local storage
function saveItems(obj) {
  var string = JSON.stringify(obj);

  localStorage.setItem('todo-items', string);
}


//Present date 
var date = new Date().toDateString()
document.querySelector('#date').innerHTML = `${date}`



// call this function as popup is opened
fetchItems();


