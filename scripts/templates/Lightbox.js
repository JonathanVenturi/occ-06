class Lightbox {

    constructor(mediaList, index) {
        this.mediaList = mediaList;
        this.index = index;
    }

    get view() {

        const view = document.createElement('div');

        // Previous button
        const previousButton = document.createElement('span');
        previousButton.classList.add('lightbox-button', 'lightbox-button-previous');
        previousButton.textContent = '\u2B9C';

        previousButton.addEventListener('click', () => {
            if(this.index != 0){
                this.index--;
                const lightboxContent = document.querySelector('.lightbox-content');
                lightboxContent.replaceWith(this.getLightboxContent());
            }
        });

        // Lightbox Content
        const lightboxContent = this.getLightboxContent();

        // Next button
        const nextButton = document.createElement('span');
        nextButton.classList.add('lightbox-button', 'lightbox-button-next');
        nextButton.textContent = '\u2B9E';

        nextButton.addEventListener('click', () => {
            if(this.index != this.mediaList.length-1){
                this.index++;
                const lightboxContent = document.querySelector('.lightbox-content');
                lightboxContent.replaceWith(this.getLightboxContent());
            }
        });

        // Close button
        const closeButton = document.createElement('span');
        closeButton.classList.add('lightbox-button', 'lightbox-button-close');
        closeButton.textContent = '\u{1f7ab}';

        closeButton.addEventListener('click', () => {
            const modalWrapper = document.querySelector('.modal-anchor');
            view.remove();
            modalWrapper.style.display = 'none';
        });

        // Attach elements to the view and return

        view.appendChild(previousButton);
        view.appendChild(lightboxContent);
        view.appendChild(nextButton);
        view.appendChild(closeButton);

        return view;
    }

    getLightboxContent() {

        const lightboxContent = document.createElement('div');
        lightboxContent.classList.add('lightbox-content');

        if (this.mediaList[this.index].type == 'photo') {
            const media = document.createElement('img');
            media.setAttribute('src', './assets/medias/' + this.mediaList[this.index].source);
            media.setAttribute('alt', this.mediaList[this.index].title);
            media.classList.add('media');
            lightboxContent.appendChild(media);

        } else {
            const media = document.createElement('video');
            const source = document.createElement('source');
            source.setAttribute('src', './assets/medias/' + this.mediaList[this.index].source);
            media.controls = true;
            media.appendChild(source);
            media.classList.add('media');
            lightboxContent.appendChild(media);
        }

        const title = document.createElement('p');
        title.textContent = this.mediaList[this.index].title;
        title.classList.add('.lightbox-title');
        lightboxContent.appendChild(title);

        return lightboxContent;

    }

}