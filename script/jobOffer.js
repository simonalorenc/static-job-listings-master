import { jobOffersContainer } from "./main.js"
import { makeCategoriesClickable } from "./categoriesFunctions.js"

export function createJobOffer(offer) {
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

    createJobName(offer, jobInfo) 

    const jobTitle = document.createElement('div')
    jobTitle.classList.add('job-info__position')
    jobTitle.textContent = offer.title
    jobInfo.appendChild(jobTitle)

    createJobTimeArea(offer, jobInfo)
    
    createJobCategoriesArea(offer, jobOffer)
}

function createJobName(offer, parentContainer) {
    const jobInfoName = document.createElement('div')
    jobInfoName.classList.add('job-info__name')
    jobInfoName.textContent = offer.companyName
    parentContainer.appendChild(jobInfoName)
} 

function createLogoElement(offer, parentContainer) {
    const jobLogoContainer = document.createElement('div')
    jobLogoContainer.classList.add('job-logo')
    parentContainer.appendChild(jobLogoContainer)
    const logoElement = document.createElement('img')
    logoElement.classList.add('job-logo__img')
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
    }
}
