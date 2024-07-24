export class Lightbox {

    constructor(mediaList) {
        this.mediaList = mediaList;
    }

    get view() {

        const view = document.createElement('div');
        view.classList.add('modal-lightbox');
        view.role = 'dialog';
        view.ariaModal = true;

        // Arrow button for previous media
        const previousButton = document.createElement('span');
        previousButton.classList.add('lightbox-button', 'lightbox-button-previous');
        previousButton.textContent = '\u2B9C';
        previousButton.addEventListener('click', this.displayPreviousMedia.bind(this));
        view.appendChild(previousButton);
        // Hide it if media is first in the collection
        if (this.index == 0) {
            previousButton.style.display = 'none';
        }

        // Displat lightbox content
        const lightboxContent = this.getLightboxContent();
        view.appendChild(lightboxContent);

        // Arrow button for next media
        const nextButton = document.createElement('span');
        nextButton.classList.add('lightbox-button', 'lightbox-button-next');
        nextButton.textContent = '\u2B9E';
        nextButton.addEventListener('click', this.displayNextMedia.bind(this));
        view.appendChild(nextButton);
        // Hide if media is last in the collection
        if (this.index == this.mediaList.length - 1) {
            nextButton.style.display = 'none';
        }

        // Close button
        const closeButton = document.createElement('span');
        closeButton.classList.add('lightbox-button', 'lightbox-button-close');
        closeButton.textContent = '\u{1f7ab}';
        closeButton.addEventListener('click', this.closeLightbox.bind(this));
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

    displayPreviousMedia() {

        // If not the first element in the list, decrement index and display
        if (this.index != 0) {
            this.index--;
            const lightboxContentSelector = document.querySelector('.lightbox-content');
            lightboxContentSelector.replaceWith(this.getLightboxContent());

            // And reset style for next button
            const nextButton = document.querySelector('.lightbox-button-next');
            nextButton.removeAttribute('style');

        };

        // If first element in the list after decrementing the index, hide the previous button
        if (this.index == 0) {
            const previousButton = document.querySelector('.lightbox-button-previous');
            previousButton.style.display = 'none';
        }
    }

    displayNextMedia() {

        if (this.index != this.mediaList.length - 1) {
            this.index++;
            const lightboxContentSelector = document.querySelector('.lightbox-content');
            lightboxContentSelector.replaceWith(this.getLightboxContent());

            const previousButton = document.querySelector('.lightbox-button-previous');
            previousButton.removeAttribute('style');

        }

        if (this.index == this.mediaList.length - 1) {
            const nextButton = document.querySelector('.lightbox-button-next');
            nextButton.style.display = 'none';
        }
    }


    openLightbox(index) {

        this.index = index;

        this.keyboardEventBoundFunction = this.handleLightboxKeyboardEvents.bind(this);
        document.addEventListener('keydown', this.keyboardEventBoundFunction);

        const modalAnchor = document.querySelector('.modal-anchor');
        const lightboxView = this.view;
        modalAnchor.appendChild(lightboxView);
        modalAnchor.style.display = 'flex';
        lightboxView.style.display = 'flex';

        const headerSelector = document.querySelector('body > header');
        const mainSelector = document.querySelector('body > main');
        headerSelector.ariaHidden = true;
        headerSelector.setAttribute('inert', true);
        mainSelector.ariaHidden = true;
        mainSelector.setAttribute('inert', true);

    }

    closeLightbox() {
        document.removeEventListener('keydown', this.keyboardEventBoundFunction);

        const headerSelector = document.querySelector('body > header');
        const mainSelector = document.querySelector('body > main');
        headerSelector.removeAttribute('aria-hidden');
        headerSelector.removeAttribute('inert');
        mainSelector.removeAttribute('aria-hidden');
        mainSelector.removeAttribute('inert');

        const lightbox = document.querySelector('.modal-lightbox');
        const modalWrapper = document.querySelector('.modal-anchor');
        lightbox.remove();
        modalWrapper.style.display = 'none';
    }

    handleLightboxKeyboardEvents(event) {

        if (event.key == 'ArrowLeft') {
            event.preventDefault();
            this.displayPreviousMedia();
        } else if (event.key == 'ArrowRight') {
            event.preventDefault();
            this.displayNextMedia();
        } else if (event.key == 'Escape') {
            event.preventDefault();
            this.closeLightbox();
        }

    }

}