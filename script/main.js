import { createJobOffer } from "./jobOffer.js"

export const jobOffersContainer = document.querySelector('.job-offers-container')
export const header = document.querySelector('.header')
export let selectedFilters = []
let offers


async function main() {
    const jsonResponse = await fetch("./data/data.json")
    const data = await jsonResponse.json()
    offers = data.offers
    renderOffers()
}

main()

export function renderOffers() {
    jobOffersContainer.innerHTML = ''
    let offersToRender = offers
    if(selectedFilters.length > 0) {
        offersToRender = offers.filter(offer => 
            selectedFilters.every(filter => 
                offer.workCharacters.includes(filter)
            ) 
        )
    }
    offersToRender.forEach(offer => {
        createJobOffer(offer)
    })
}

// export function renderOffers() {
//     jobOffersContainer.innerHTML = ''
//     let offersToRender = offers
//     if(selectedFilters.length > 0) {
//         offersToRender = offers.filter(offer => 
//             offer.workCharacters.some(workCharacter => 
//                 selectedFilters.includes(workCharacter)
//             ) 
//         )
//     }
//     offersToRender.forEach(offer => {
//         createJobOffer(offer)
//     })
// }