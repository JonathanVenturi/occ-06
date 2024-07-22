export class Media {

    constructor(JSONdata, collection) {

        const { id, title, date, likes } = JSONdata;

        this.id = id;
        this.title = title;
        this.date = date;
        this.likes = likes;

        this.collection = collection;

        if (this.isLiked) {
            this.likes++;
        }

    }

    toggleLiked() {
        if (this.isLiked) {
            this.isLiked = false;
        } else if (!this.isLiked) {
            this.isLiked = true;
        }
        // Re-rendering the extra infos to account for the updated likes
        this.collection.photographer.view.renderInfo();
    }

    get isLiked() {
        // Retrieving like list from localStorage and converting to array
        var likedMedias = localStorage.getItem('likedMedias');
        likedMedias = likedMedias ? JSON.parse(likedMedias) : [];
        // Check if the current media is included in the list of liked medias
        return likedMedias.includes(this.id);
    }

    set isLiked(boolean) {
        // Retrieving like list from localStorage and converting to array
        var likedMedias = localStorage.getItem('likedMedias');
        likedMedias = likedMedias ? JSON.parse(likedMedias) : [];

        if (boolean && !this.isLiked) {
            this.likes++;
            likedMedias.push(this.id);
        } else if (!boolean && this.isLiked) {
            this.likes--;
            const index = likedMedias.indexOf(this.id);
            likedMedias.splice(index, 1);
        }

        // Store the list back in localStorage
        localStorage.setItem('likedMedias', JSON.stringify(likedMedias));

    }

}