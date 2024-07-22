import { Photo } from '../models/Photo.js';
import { Video } from '../models/Video.js';

export class MediaFactory {

    constructor(JSONdata, collection) {

        if (JSONdata.image) {
            return new Photo(JSONdata, collection)
        }
        if (JSONdata.video) {
            return new Video(JSONdata, collection)
        }

    }

}