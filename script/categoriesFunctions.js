import { header, selectedFilters, renderOffers, jobOffersContainer } from "./main.js"

const filterInput = document.createElement('div')
filterInput.classList.add('filter-input')
const filterCategoriesContainer = document.createElement('div')
filterCategoriesContainer.classList.add('filter-input__categories-container')


export function makeCategoriesClickable(e) {
    
    const choosenCategory = e.target
    const clonedCategory = choosenCategory.cloneNode(true)
    const categoryToCompare = clonedCategory.innerHTML
    createDeleteSymbol(clonedCategory, filterCategoriesContainer)
    if (!header.contains(filterInput)) {
        header.appendChild(filterInput)
    }
    console.log(document.querySelector('.category__clear'))
    if (!filterInput.contains(filterCategoriesContainer)) {
        filterInput.insertBefore(filterCategoriesContainer, document.querySelector('.category__clear') )
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

function createDeleteSymbol(parentContainer, element) {
    const deleteSymbol = document.createElement('div')
    deleteSymbol.classList.add('category__delete')
    deleteSymbol.innerHTML = 'x' 
    deleteSymbol.addEventListener('click', (e) => {
        if (element.contains(e.target.parentNode)) {
            const clickedFilter = e.target.parentNode.textContent
            const filterToDelete = clickedFilter.slice(0, -1)
            element.removeChild(e.target.parentNode)
            console.log(e.target.parentNode)
            console.log(selectedFilters)
            console.log(filterToDelete)
            let index = selectedFilters.indexOf(filterToDelete)
            selectedFilters.splice(index, 1)
            console.log('wtf')
            renderOffers()
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
    if (filterCategoriesContainer.hasChildNodes()) {
        for (let i = 0; i < selectedFilters.length; i ++) {
            filterCategoriesContainer.removeChild(filterCategoriesContainer.firstChild)
        }
    }
    if (filterInput.contains(filterCategoriesContainer)) {
        console.log('dddd')
        filterInput.removeChild(filterCategoriesContainer)
    }
    selectedFilters.length = 0
    console.log(filterInput)
    console.log(filterCategoriesContainer)
    filterInput.appendChild(filterCategoriesContainer)
    console.log(filterCategoriesContainer)
    hideFilterInput()
    renderOffers()
}

function hideFilterInput() {
    if (filterInput.contains(document.querySelector('.category__clear'))) {
        filterInput.removeChild((document.querySelector('.category__clear')))
    }
    if (header.contains(filterInput)) {
        header.removeChild(filterInput)
    }
}