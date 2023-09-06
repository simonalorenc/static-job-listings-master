const jobOffersContainer = document.querySelector('.job-offers-container')
const body = document.querySelector('body')
const header = document.querySelector('.header')
let offers
let selectedFilters = []

async function main() {
    const jsonResponse = await fetch("./data/data.json")
    const data = await jsonResponse.json()
    offers = data.offers
    renderOffers()
}

main()

function renderOffers() {
    let offersToRender = offers
    if(selectedFilters.length > 0) {
        offersToRender = offers.filter(offer => 
            offer.workCharacters.some(workCharacter => 
                selectedFilters.includes(workCharacter)
            ) 
        )
    }
    console.log(offersToRender)
    offersToRender.forEach(offer => {
        createJobOffer(offer)
    })
}
    
function createJobOffer(offer) {
    const jobOffer = document.createElement('div')
    jobOffer.classList.add('job-offer')
    jobOffersContainer.appendChild(jobOffer)

    const jobMainInfo = document.createElement('div')
    jobMainInfo.classList.add('job-main-info')
    jobOffer.appendChild(jobMainInfo)

    createLogoElement(offer, jobMainInfo)

    const jobInfo = document.createElement('div')
    jobInfo.classList.add('job-info')
    jobMainInfo.appendChild(jobInfo)

    const jobInfoName = document.createElement('div')
    jobInfoName.classList.add('job-info__name')
    jobInfoName.textContent = offer.companyName
    jobInfo.appendChild(jobInfoName)

    const jobTitle = document.createElement('div')
    jobTitle.classList.add('job-info__position')
    jobTitle.textContent = offer.title
    jobInfo.appendChild(jobTitle)

    createJobTimeArea(offer, jobInfo)
    
    createJobCategoriesArea(offer, jobOffer)
}

function createLogoElement(offer, parentContainer) {
    const jobLogoContainer = document.createElement('div')
    jobLogoContainer.classList.add('job-logo')
    parentContainer.appendChild(jobLogoContainer)
    const logoElement = document.createElement('img')
    logoElement.src = offer.image
    jobLogoContainer.appendChild(logoElement)
}

function createJobTimeArea(offer, parentContainer) {
    const jobTime = document.createElement('div')
    jobTime.classList.add('job-info__time-place')
    for (let i = 0; i < offer.workTimeAndPlace.length; i++) {
        if (i < offer.workTimeAndPlace.length - 1) {
            jobTime.textContent += offer.workTimeAndPlace[i] + ' • '
        } else {
            jobTime.textContent += offer.workTimeAndPlace[i]
        }
    }
    parentContainer.appendChild(jobTime)
}

const filterInput = document.createElement('div')
filterInput.classList.add('filter-input')

function createJobCategoriesArea(offer, parentContainer) {
    const jobRequirements = document.createElement('div')
    jobRequirements.classList.add('job-categories')
    parentContainer.appendChild(jobRequirements)
    for (let i = 0; i < offer.workCharacters.length; i++) {
        const oneRequirement = document.createElement('div')
        oneRequirement.classList.add('job-categories__category')
        oneRequirement.textContent += offer.workCharacters[i]
        oneRequirement.addEventListener('click', makeCategoriesClickable)
        jobRequirements.appendChild(oneRequirement)
        console.log(jobRequirements)
    }
}

function makeCategoriesClickable(e) {
    console.log(e.target)
    const choosenCategory = e.target
    const clonedCategory = choosenCategory.cloneNode(true)
    const categoryToCompare = clonedCategory.innerHTML
    createDeleteSymbol(clonedCategory, filterInput)
    header.appendChild(filterInput)
    clonedCategory.classList.remove('job-categories__category')
    clonedCategory.classList.add('category')
    filterInput.appendChild(clonedCategory)
    selectedFilters.push(categoryToCompare)
    jobOffersContainer.innerHTML = ''
    renderOffers()
}

function createDeleteSymbol(parentContainer, filterInput) {
    const deleteSymbol = document.createElement('div')
    deleteSymbol.classList.add('category__delete')
    deleteSymbol.innerHTML = 'x' 
    deleteSymbol.addEventListener('click', (e) => {
        if (filterInput.contains(e.target.parentNode))
        filterInput.removeChild(e.target.parentNode)
    })
    parentContainer.appendChild(deleteSymbol)
}


      //w json przekazać url(https itd) do obrazków i załadować, dodać placholder podczas ładowania(kółko)