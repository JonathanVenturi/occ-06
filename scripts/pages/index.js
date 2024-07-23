import { JsonDataApi } from '../models/JSONData.js';
import { Photographer} from '../models/Photographer.js';

async function init() {
    // Getting JSON data for all photographers
    const JsonData = new JsonDataApi('./data/photographers.json');
    const photographersData = await JsonData.getPhotographersData();

    // Caching selector for the view
    const photographersSection = document.querySelector(".photographers-list");

    for await (const photographer of photographersData) {
        const photographerCollection = await JsonData.getMediaFromPhotographer(photographer.id);
        const photographerObject = new Photographer(photographer, photographerCollection);
        photographersSection.appendChild(photographerObject.view.card);
    }
}

init();