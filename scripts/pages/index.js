async function getPhotographersData() {
    const response = await fetch('./data/photographers.json');
    const photographersData = await response.json();
    return photographersData;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographersData();
    displayData(photographers);
}

init();