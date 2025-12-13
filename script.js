let inputArtical = document.getElementById('inputText');
let inputPrice = document.getElementById('inputNum');
let inputBtn = document.getElementById('btn');
let uiSpan = document.querySelector('#dynamic-section');
let heading = document.querySelector('#total');


let Arr = [];

// --------getItem--------
let getItem = JSON.parse(localStorage.getItem('itemList')) || [];
Arr = getItem;

// recalprce stabal price
sumPrice();

// ---------- lastId jugaar ----------
let lastId = 0;
if (localStorage.getItem('lastId')) {
    lastId = Number(localStorage.getItem('lastId'));
} else if (Arr.length > 0) {   
    lastId = Math.max(...Arr.map((i) => i.id));
}

addList(getItem);

inputBtn.addEventListener('click', () => {
    let inputText = inputArtical.value.trim().replace(/ +/g, ' ');
    let inputNum = inputPrice.value;

    // Validation----------
    if (!inputText && !inputNum) {
        return console.log("Please Enter the Article & Price");
    }
    else if (!inputNum) {
        return console.log('Please Enter the Price');
    }
    else if (!inputText) {
        return console.log('Please Enter the Artical');
    }

    //object with continuous ID
    let obj = {
        id: lastId + 1,
        artical: inputText,
        price: inputNum
    }

    Arr.push(obj);

    // ------ setItem--------
    localStorage.setItem('itemList', JSON.stringify(Arr));
    localStorage.setItem('lastId', obj.id);        // save lastId
    lastId = obj.id;                              // update lastId

    addList(Arr);

    inputArtical.value = "";
    inputPrice.value = "";

    sumPrice();
});

// -------sum functionality
function sumPrice() {
    let newArr = Arr.reduce((acc, cur) => acc + Number(cur.price), 0);
    heading.textContent = "Total: " + newArr;
}

function addList(getItem) {
    uiSpan.innerHTML = "";

    getItem.forEach((curr) => {
        let row = document.createElement("div");
        row.classList.add("item");

        let spanArtical = document.createElement("span");
        spanArtical.textContent = curr.artical;

        let spanPrice = document.createElement("span");
        spanPrice.textContent = curr.price;

        let updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        row.appendChild(spanArtical);
        row.appendChild(spanPrice);
        row.appendChild(updateBtn);
        row.appendChild(deleteBtn);

        uiSpan.appendChild(row);

        deleteBtn.addEventListener('click', () => {
            delteFunc(curr, row);
        });

        updateBtn.addEventListener('click', () => {
            updateFunc(curr, row);
        });
    });
}

//delete func
function delteFunc(obj, row) {
    Arr = Arr.filter((curr) => curr.id !== obj.id);
    sumPrice();
    row.remove();
    localStorage.setItem('itemList', JSON.stringify(Arr));
}

// ----------update Function---------
function updateFunc(obj, row) {
    let current = Arr.find((curr) => curr.id == obj.id);

    let createArtical = document.createElement("input");
    createArtical.type = "text";
    createArtical.value = current.artical;

    let createPrice = document.createElement("input");
    createPrice.type = "number";
    createPrice.value = current.price;

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    row.innerHTML = ""
    row.appendChild(createArtical);
    row.appendChild(createPrice);
    row.appendChild(saveBtn);

    saveBtn.addEventListener('click', () => {
        saveFunc(createArtical, createPrice, obj, row);
    });
}

// Save Todo
function saveFunc(createArtical, createPrice, obj, row) {
    obj.artical = createArtical.value;
    obj.price = createPrice.value;

    row.innerHTML = ""

    localStorage.setItem('itemList', JSON.stringify(Arr));

    sumPrice();
    renderUpdatedRow(obj, row);
}

//function rebuild
function renderUpdatedRow(obj, row) {
    let spanArtical = document.createElement("span");
    spanArtical.textContent = obj.artical;

    let spanPrice = document.createElement("span");
    spanPrice.textContent = obj.price;

    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    row.appendChild(spanArtical);
    row.appendChild(spanPrice);
    row.appendChild(updateBtn);
    row.appendChild(deleteBtn);

    updateBtn.addEventListener('click', () => {
        updateFunc(obj, row);
    });

    deleteBtn.addEventListener('click', () => {
        delteFunc(obj, row);
    });
}
