class Collection {

    constructor(data, photographer) {

        this.medias = [];

        data.forEach(media => {
            const mediaObject = new MediaFactory(media, this);
            this.medias.push(mediaObject);
        });

        this.photographer = photographer;

        this.view = new CollectionView(this);

    }

    get likes() {
        const likesCount = this.medias.reduce(
            (accumulator, currentValue) => accumulator + currentValue.likes, 0
        );
        return likesCount;
    }

}