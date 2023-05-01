const form = document.querySelector("#novoItem");
const list = document.querySelector(".lista");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach(item => {
    addItem(item)
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const itemAmount = event.target.elements.quantidade.value;
    const itemName = event.target.elements.nome.value;
    const isHaveElement = items.find(item => item.nome === itemName);

    if (!isHaveElement){
        const currItem = {
            "id":  items.length === 0 ? 0 : items[items.length - 1].id + 1,
            "nome": itemName,
            "quantidade": itemAmount
        };
        items.push(currItem);
        addItem(currItem);

    } else {
        isHaveElement.quantidade = itemAmount;
        const el = list.querySelector(`[data-id="${isHaveElement.id}"]`);
        updateItem(el, isHaveElement);
    }
    
    localStorage.setItem("items", JSON.stringify(items));
});

function addItem (currItem) {
    const item = document.createElement("li");
    item.classList.add("item");
    item.innerHTML = `<strong>${currItem.quantidade}</strong>${currItem.nome}`;
    item.dataset.id = currItem.id;
    list.appendChild(item);
    form.reset();
    createButton(item, currItem.id);
}

function updateItem (el, item) {
    el.querySelector("strong").innerHTML = item.quantidade;
}

function createButton(item, id) {
    const btn = document.createElement("button");
    btn.innerHTML = "X";
    item.appendChild(btn);
    btn.addEventListener("click", () => {
        removeItem(item, id)

    })
}

function removeItem(item, id){
    item.remove();
    items.splice(items.findIndex(element => element.id === id), 1);
    localStorage.setItem("items", JSON.stringify(items));
}