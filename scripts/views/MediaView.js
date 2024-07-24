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
        heart.classList.add('heart');
        heart.tabIndex = 0;
        heart.role = 'switch';
        heart.textContent = this.media.likes;
        heart.ariaLabel = this.media.likes + ' likes';
        if(this.media.isLiked) {
            heart.classList.add('liked');
            heart.ariaChecked = true;
        } else {
            heart.ariaChecked = false;
        }
        info.appendChild(heart);

        heart.addEventListener('click', (event) => {
            this.media.toggleLiked();
            this.updateInfo(event.target.parentNode);
        });

        heart.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                heart.click();
            }
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