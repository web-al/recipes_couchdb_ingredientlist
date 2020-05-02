'use strict';

import awlib from './awlib.js';

const $ = selector => document.querySelector(selector);
const log = console.log;

let output = $('#output')

let ingredientListArray = [];
let recipeMap = new Map(); 

// DB-Daten-Ausgabe unter /loadAllRecipes
const init = () => {
    fetch('/loadAllRecipes').then(
        antwort => antwort.json()
    ).then(
        antwort => listeAusgeben(antwort.rows, 'name')
    ).catch(
        log
    )
}
const listeAusgeben = (rows, sortBy=false) => {
    rows.forEach(recipe => {
        let recipeContainer = awlib.DOMElementAnlegen({
            eltern: output            
        })

        recipeMap.set(recipeContainer, recipe);

        awlib.DOMElementAnlegen({
            typ: 'h3',
            eltern: recipeContainer,
            inhalt: "Title:"
        })
        awlib.DOMElementAnlegen({
            typ: 'p',
            eltern: recipeContainer,
            inhalt: recipe.doc.title
        })
        awlib.DOMElementAnlegen({
            typ: 'h3',
            eltern: recipeContainer,
            inhalt: "Time:"
        })        
        awlib.DOMElementAnlegen({
            typ: 'p',
            eltern: recipeContainer,
            inhalt: recipe.doc.time
        })
        awlib.DOMElementAnlegen({
            typ: 'h3',
            eltern: recipeContainer,
            inhalt: "Servings:"
        })
        awlib.DOMElementAnlegen({
            typ: 'p',
            eltern: recipeContainer,
            inhalt: recipe.doc.servings
        })
        awlib.DOMElementAnlegen({
            typ: 'h3',
            eltern: recipeContainer,
            inhalt: "Ingredients:"
        })    
        let ingredientList = awlib.DOMElementAnlegen({
            typ: 'ul',
            eltern: recipeContainer
        }) 
        let ingredientButton = awlib.DOMElementAnlegen({
            typ: 'button',
            eltern: recipeContainer,
            inhalt: "Zutaten auf Einkaufsliste setzen",
            klassen: ['add2ingredientList btn btn-warning']
        })
        ingredientButton.addEventListener("click", ()=> {
            updateIngredientList(recipeMap.get(recipeContainer).doc.ingredients);
        }
        )

        for( let i = 0; i < recipe.doc.ingredients.length; i++ ) {
            let ingredientListElement = awlib.DOMElementAnlegen({
                typ: 'button',
                eltern: ingredientList,
                klassen: ['ingredient list-group-item']
            }) 
            awlib.DOMElementAnlegen({
                typ: 'span',
                eltern: ingredientListElement,
                inhalt: recipe.doc.ingredients[i].amount,
                klassen: ['amount']
            })        
            awlib.DOMElementAnlegen({
                typ: 'span',
                eltern: ingredientListElement,
                inhalt: recipe.doc.ingredients[i].unit,
                klassen: ['unit']
            })
            awlib.DOMElementAnlegen({
                typ: 'span',
                eltern: ingredientListElement,
                inhalt: recipe.doc.ingredients[i].name,
                klassen: ['name']
            }) 
        }
        
        awlib.DOMElementAnlegen({
            typ: 'h3',
            eltern: recipeContainer,
            inhalt: "Instructions:"
        })        
        let instructionList = awlib.DOMElementAnlegen({
            typ: 'ul',
            eltern: recipeContainer
        }) 
        
        for( let i = 0; i < recipe.doc.instructions.length; i++ ) {
            let instructionListElement = awlib.DOMElementAnlegen({
                typ: 'button',
                eltern: instructionList,
                klassen: ['list-group-item']
            }) 
            awlib.DOMElementAnlegen({
                typ: 'span',
                eltern: instructionListElement,
                inhalt: recipe.doc.instructions[i].actions
            })        
        }
    })
}

let updateIngredientList = (map) => {
    const ingredientListElement = $('.ingredient-list');
    //ingredientListElement.innerHTML = "";
    let arr = Object.values(map)
    let str = ""
    for ( let i = 0; i < arr.length; i++ ) {
        str = arr[i].amount + " " + arr[i].unit + " " + arr[i].name
        awlib.DOMElementAnlegen({
            typ: 'li',
            eltern: ingredientListElement,
            klassen: ['ingredient-list-li list-group-item'],
            inhalt: str
            
        })  
        // const ingredientListLiElement = $('.ingredient-list-li');
        // awlib.DOMElementAnlegen({
        //     typ: 'div',
        //     eltern: ingredientListLiElement,
        //     klassen: ['view'],
            
        // })
        // const ingredientListDivElement = $('.view'); 
        // awlib.DOMElementAnlegen({
        //     typ: 'input',
        //     eltern: ingredientListDivElement,
        //     klassen: ['check'],
        //     checkbox: 'checkbox'
        // })
        // awlib.DOMElementAnlegen({
        //     typ: 'label',
        //     eltern: ingredientListDivElement,
        //     inhalt: str
        // }) 
        // awlib.DOMElementAnlegen({
        //     typ: 'button',
        //     eltern: ingredientListDivElement,
        //     klassen: ['delete'],
        //     inhalt: 'X'
        // })                 
    }
}

init();