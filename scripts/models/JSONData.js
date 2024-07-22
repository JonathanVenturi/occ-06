export class JsonDataApi {

    constructor(url) {
        this.url = url;
    }

    async getPhotographersData() {
        return fetch(this.url)
            .then(response => response.json())
            .then(response => response.photographers)
            .catch(error => console.log('Error retrieving the photographers data', error));
    }


    async getPhotographerDataById(id) {
        return fetch(this.url)
            .then(response => response.json())
            .then(response => response.photographers.find((photographer) => photographer.id === id))
            .catch(error => console.log('Error retrieving the photographers data', error));
    }


    async getMediaData() {
        return fetch(this.url)
            .then(response => response.json())
            .then(response => response.media)
            .catch(error => console.log('Error retrieving the medias data', error));
    }

    async getMediaFromPhotographer(id) {
        return fetch(this.url)
        .then(response => response.json())
        .then(response => response.media.filter((media) => media.photographerId === id))
        .catch(error => console.log('Error retrieving the medias data', error))
    }
    
}