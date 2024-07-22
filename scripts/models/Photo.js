import { Media } from '../models/Media.js';

export class Photo extends Media {
    constructor(JSONdata, collection) {
        super(JSONdata, collection);
        this.source = JSONdata.image;
        this.type = 'photo';
    }
}