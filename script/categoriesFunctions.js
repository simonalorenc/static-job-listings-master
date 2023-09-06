import { header, selectedFilters, jobOffersContainer, renderOffers } from "./main.js"

const filterInput = document.createElement('div')
filterInput.classList.add('filter-input')
const filterCategoriesContainer = document.createElement('div')
filterCategoriesContainer.classList.add('filter-input__categories-container')
filterInput.appendChild(filterCategoriesContainer)

export function makeCategoriesClickable(e) {
    const choosenCategory = e.target
    const clonedCategory = choosenCategory.cloneNode(true)
    const categoryToCompare = clonedCategory.innerHTML
    createDeleteSymbol(clonedCategory, filterCategoriesContainer)
    if (!header.contains(filterInput)) {
        header.appendChild(filterInput)
    }
    clonedCategory.classList.remove('job-categories__category')
    clonedCategory.classList.add('category')
    let categoryExists = false
    if (selectedFilters.length != 0 ) {
        for (let i = 0; i < selectedFilters.length; i++) {
            if (selectedFilters[i] === categoryToCompare) {
                categoryExists = true
                break
            } else {
                categoryExists = false
            }
        }
        if (!categoryExists) {
            selectedFilters.push(categoryToCompare)
            filterCategoriesContainer.appendChild(clonedCategory)
        }
    } else {
        selectedFilters.push(categoryToCompare)
        filterCategoriesContainer.appendChild(clonedCategory)
    }
    renderOffers()
    if (!filterInput.contains(document.querySelector('.category__clear'))) {
        createClearFiltersSymbol(filterInput)
    } 
}

function createDeleteSymbol(parentContainer, filterInput) {
    const deleteSymbol = document.createElement('div')
    deleteSymbol.classList.add('category__delete')
    deleteSymbol.innerHTML = 'x' 
    deleteSymbol.addEventListener('click', (e) => {
        if (filterInput.contains(e.target.parentNode)) {
            const clickedFilter = e.target.parentNode.textContent
            const filterToDelete = clickedFilter.slice(0, -1)
            filterInput.removeChild(e.target.parentNode)
            let index = selectedFilters.indexOf(filterToDelete)
            selectedFilters.splice(index, 1)
            renderOffers()
            console.log(selectedFilters)
        }
        if (selectedFilters.length == 0) {
            hideFilterInput()
        }
    })
    parentContainer.appendChild(deleteSymbol)
}

function createClearFiltersSymbol(parentContainer) {
    if (selectedFilters.length == 1) {
        const clearSymbol = document.createElement('div')
        clearSymbol.classList.add('category__clear')
        clearSymbol.innerHTML = 'Clear x'
        parentContainer.appendChild(clearSymbol) 
        clearSymbol.addEventListener('click', clearAllFilters)
    } else {
        return
    }
}

function clearAllFilters() {
    hideFilterInput()
    console.log(selectedFilters)
    selectedFilters.length = 0
    console.log(selectedFilters)
    renderOffers()
}

function hideFilterInput() {
    if (header.contains(filterInput)) {
        header.removeChild(filterInput)
    }
}