export class MediaView {

    constructor(media) {
        this.media = media;
        return this.view;
    }

    get info() {

        const info = document.createElement('div');
        info.classList.add('media-info');

        const h2 = document.createElement('h2');
        h2.textContent = this.media.title;
        info.appendChild(h2);

        const heart = document.createElement('span');
        heart.textContent = this.media.likes;
        heart.classList.add('heart');
        if(this.media.isLiked) {
            heart.classList.add('liked');
        }
        info.appendChild(heart);

        heart.addEventListener('click', (event) => {
            this.media.toggleLiked();
            this.updateInfo(event.target.parentNode);
        });

        return info;

    }

    get view() {
        const card = document.createElement('article');

        if(this.media.type == 'photo') {
            const media = document.createElement('img');
            media.setAttribute('src', './assets/medias/' + this.media.source);
            media.setAttribute('alt', this.media.title);
            media.classList.add('media');
            card.appendChild(media);
        } else if (this.media.type == 'video') {
            const media = document.createElement('video');
            const source = document.createElement('source');
            source.setAttribute('src', './assets/medias/' + this.media.source);
            media.appendChild(source);
            media.classList.add('media');
            card.appendChild(media);
        }

        const info = this.info;
        
        card.appendChild(info);
        return card;
    }

    updateInfo(target) {
        target.replaceWith(this.info);
    }

}