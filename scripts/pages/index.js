async function init() {
    // Getting JSON data for all photographers
    const JsonData = new JsonDataApi('./data/photographers.json');
    const photographersData = await JsonData.getPhotographersData();

    // Caching selector for the view
    const photographersSection = document.querySelector(".photographer_section");

    for await (const photographer of photographersData) {
        const photographerCollection = await JsonData.getMediaFromPhotographer(photographer.id);
        const photographerObject = new Photographer(photographer, photographerCollection);
        photographersSection.appendChild(photographerObject.view.card);
    }
}

init();