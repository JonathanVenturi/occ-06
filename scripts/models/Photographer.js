class Photographer {

    constructor(photographerData, mediaData) {

        const { id, name, portrait, city, country, tagline, price } = photographerData;
        this.id = id;
        this.name = name;
        this.portrait = 'assets/photographers/' + portrait;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;

        this.medias = new Collection(mediaData, this);
        
        this.view = new PhotographerView(this);

    }

}