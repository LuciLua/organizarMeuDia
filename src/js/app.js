const table_cat_column = document.querySelectorAll('.table_cat')

document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
})

document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
})

table_cat_column.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        const dragging = document.querySelector(".dragging")
        const applyAfter = getNewPosition(item, e.clientY)

        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging)
        } else {
            item.prepend(dragging)
        }
    })
})

function getNewPosition(column, posY) {
    const cards = column.querySelectorAll(".table_item:not(.dragging)")
    let result;

    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect()
        const boxCenteredY = box.y + box.height / 2;

        if (posY >= boxCenteredY) result = refer_card;
    }

    return result

}

const btn_add_task = document.querySelector('.btn_add_task')

btn_add_task.addEventListener("click", (e) => {

    const newElement = document.createElement("input")
    newElement.setAttribute("class", "table_item")
    newElement.setAttribute("draggable", true)

    table_cat_column.forEach((column) => {
        if(column.className.includes('inProgress')){
            column.appendChild(newElement)
            console.log(column)
        }
    })
})