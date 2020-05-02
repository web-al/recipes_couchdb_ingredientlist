'use strict';

const ENTER_KEY = 13 // Keycode der ENTER-Taste

const $ = selector => document.querySelector(selector);
const log = console.log;

// wenn DOM geladen, dann neues Listenelement basteln
document.addEventListener("DOMContentLoaded", () => {
    const newIngredient = document.querySelector(".new-ingredient") // Eingabefeld
    const ingredientListEl = document.querySelector(".ingredient-list")
    const footerEl = document.querySelector(".footer")
    const ingredientCountEl = document.querySelector(".ingredient-count")
    const deleteCheckedEl = document.querySelector(".delete-checked")
    const downloadButton = document.querySelector("#download-button")

    document.getElementById("download-button").addEventListener("click", () => {
        let str = ""
        for (let i = 1; i <= ingredientListEl.childElementCount; i++) {
            if (ingredientListEl.childNodes[i].nodeName == "LI") {
                str = str + ingredientListEl.childNodes[i].innerText + "\n"
            }
        }        
        var aEl = document.createElement('a');
        aEl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str))
        aEl.setAttribute('download', "my_ingredient_list.txt")
        aEl.style.display = 'none'
        document.body.appendChild(aEl)
        aEl.click()
        document.body.removeChild(aEl)
    })

    const refreshFooter = () => {   // wenn es keine Listen-Elemente gibt: Footer ausblenden
        if (ingredientListEl.children.length === 0) {
            footerEl.style.display = "none"
        }
        else {
            footerEl.style.display = "block" // oder besser inline?
        }
        // Nicht-Durchgestrichene zählen
        let ingredientCounter = 0
        for (const ingredientListLiEl of ingredientListEl.children) {
            if (!ingredientListLiEl.classList.contains("crossed-out")) {
                ingredientCounter++
            }
        }
        ingredientCountEl.innerText = ingredientCounter

        // Durchgestrichene zählen
        let crossedOutCounter = 0
        for (const ingredientListLiEl of ingredientListEl.children) {
            if (ingredientListLiEl.classList.contains("crossed-out")) {
                crossedOutCounter++
            }
        }
        if (crossedOutCounter === 0) {
            deleteCheckedEl.style.display = "none"
        }
        else {
            deleteCheckedEl.style.display = ""
        }
    }
    refreshFooter()

    const liCallback = (liEl) => {
        // Durchstreichen
        const checkboxEl = liEl.querySelector(".check")
        checkboxEl.addEventListener("change", () => {
            if (checkboxEl.checked) {
                liEl.classList.add("crossed-out")
            }
            else {
                liEl.classList.remove("crossed-out")
            }
            refreshFooter()
        })

        // Löschen
        const deleteButtonEl = liEl.querySelector(".delete")
        deleteButtonEl.addEventListener("click", () => {
            liEl.remove()
            refreshFooter()
        })
    }    
    
    newIngredient.addEventListener("keypress", (event) => {
        // wenn ENTER-Taste gedrückt und Eingabefeld nicht leer
        if (event.which === ENTER_KEY && newIngredient.value !== "") {
            
            const newLiEl = document.createElement("li") // <li></li>
            newLiEl.classList.add("list-group-item") // <li class="list-group-item"></li>
            
            const newDivEl = document.createElement("div")
            newDivEl.classList.add("view") // <div class="view"></view>
            
            const newInputCheckbox = document.createElement("input")
            newInputCheckbox.classList.add("check")
            newInputCheckbox.type = "checkbox" // <input class="check" type="checkbox">
            // newInputCheckbox.checked = true
            
            const newLabelEl = document.createElement("label")
            newLabelEl.appendChild(
                document.createTextNode(newIngredient.value) // <label>...</label>
            )
            
            const newButtonEl = document.createElement("button")
            newButtonEl.classList.add("delete", "btn", "btn-danger", "badge")     // <button class="delete btn btn-danger badge"></button>
            newButtonEl.innerText = "X"             // <button class="delete btn btn-danger badge">X</button>

            // Elemente aneinanderhängen            
            newDivEl.appendChild(newInputCheckbox)  // <input class="check" type="checkbox">
            newDivEl.appendChild(newLabelEl)        // <label>...</label>
            newDivEl.appendChild(newButtonEl)       // <button class="delete btn btn-danger badge"></button>
            
            newLiEl.appendChild(newDivEl)           // <li>[newDivEl]</li>

            ingredientListEl.append(newLiEl) // unten einhängen || .prepend: oben einhängen

            newIngredient.value = "" // Eingabefeld leeren

            liCallback(newLiEl)

            refreshFooter()
        }
        
    })
    // Lösche Abgehakte
    deleteCheckedEl.addEventListener("click", (event) => {
        const crossedOutLiEls = ingredientListEl.querySelectorAll("li.crossed-out")
        for (const crossedOutLiEl of crossedOutLiEls) {
            crossedOutLiEl.remove()
        }
        refreshFooter()
    })
})