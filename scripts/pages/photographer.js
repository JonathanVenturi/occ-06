import { JsonDataApi } from '../models/JSONData.js';
import { Photographer} from '../models/Photographer.js';

async function init() {

    // Getting photographer's ID from URL
    const URLParams = new URLSearchParams(window.location.search);
    const photographerId = Number(URLParams.get('id'));

    // Retrieving JSON data for current photographer
    const JsonData = new JsonDataApi('././data/photographers.json');
    const photographerData = await JsonData.getPhotographerDataById(photographerId);
    const mediasData = await JsonData.getMediaFromPhotographer(photographerId);

    // Building photographer object
    const photographer = new Photographer(photographerData, mediasData);

    // Updating page title and content
    document.title = 'Fisheye - ' + photographer.name;

    // 
    photographer.view.renderProfile();
    // Rendering the view for the extra informations
    photographer.view.renderInfo();

    // Rendering the gallery
    photographer.medias.view.render();

}

init();