import { MediaView } from '../views/MediaView.js';
import { Lightbox } from '../views/Lightbox.js';

export class CollectionView {

    constructor(collection) {
        this.collection = collection.medias;

        this.lightbox = new Lightbox(this.collection);

        // Building the option list for the sorter
        this.sortingOptions = new Map([
            ['likes', 'Popularité'],
            ['date', 'Date'],
            ['title', 'Titre']
        ]);
        // Default sorting by likes
        this.sorter = 'likes';
        this.sort();
    }

    get sortingDropdown() {

        const sorter = document.createElement('div');
        sorter.classList.add('collection-sorter');

        const label = document.createElement('span');
        label.id = 'sorter-label';
        label.textContent = 'Trier par :';
        sorter.appendChild(label);

        const wrapper = document.createElement('div');
        wrapper.classList.add('sorter-wrapper');

        const button = document.createElement('button');
        button.classList.add('sorter-button');
        button.role = 'combobox';
        button.ariaLabel = 'Sort medias';
        button.setAttribute('aria-labelledby', 'sorter-label'); // Better for WCAG compliance in FF
        button.ariaHasPopup = 'listbox';
        button.ariaExpanded = 'false';
        button.setAttribute('aria-controls', 'sorter-dropdown'); // Replace this with line below when support gets better
        // button.ariaControlsElements = 'sorter-dropdown'; // https://caniuse.com/mdn-api_element_ariacontrolselements

        button.addEventListener('click', () => {
            button.ariaExpanded = button.ariaExpanded !== 'true';
            sorter.classList.toggle('active');
        });

        const buttonContent = document.createElement('span');
        buttonContent.textContent = this.sortingOptions.get(this.sorter);
        const buttonArrow = document.createElement('span');
        buttonArrow.classList.add('button-arrow');
        buttonArrow.textContent = '\u23F7';
        button.appendChild(buttonContent);
        button.appendChild(buttonArrow);

        const list = document.createElement('ul');
        list.id = 'sorter-dropdown';
        list.classList.add('sorter-dropdown');
        list.role = 'listbox';
        list.setAttribute('aria-labelledby', 'sorter-label');
        // list.ariaLabelledByElements = 'sorter-label'; // Another widely unsupported ARIA property - See above

        this.sortingOptions.forEach((value, key) => {

            const item = document.createElement('li');
            item.textContent = value;
            item.tabIndex = 0;
            item.role = 'listitem';

            if (this.sorter == key) {
                item.style.display = 'none';
            }

            item.addEventListener('click', (event) => {

                buttonContent.textContent = value;
                sorter.classList.remove('active');

                const items = document.querySelectorAll('.sorter-dropdown li');
                items.forEach(item => {
                    item.removeAttribute('style');
                });
                event.target.style.display = 'none';

                this.sorter = key;
                this.refresh();
            });

            item.addEventListener('keydown', (event) => {
                if (event.key == 'Enter') {
                    event.preventDefault();
                    item.click();
                }
            });


            list.appendChild(item);
        });

        wrapper.appendChild(button);
        wrapper.appendChild(list);
        sorter.appendChild(wrapper);

        return sorter;

    }

    get view() {
        const view = document.createElement('section');
        view.classList.add('media-section');
        view.appendChild(this.sortingDropdown);
        view.appendChild(this.gallery);
        return view;
    }


    get gallery() {
        const gallery = document.createElement('section');
        gallery.classList.add('media-gallery');

        this.collection.forEach((media, index) => {

            const card = new MediaView(media);

            const mediaSelector = card.querySelector('.media');
            mediaSelector.tabIndex = 0;
            media.ariaHasPopup = 'true';

            mediaSelector.addEventListener('click', () => {
                this.lightbox.openLightbox(index);
            });

            mediaSelector.addEventListener('keydown', (event) => {
                if (event.key == 'Enter') {
                    event.preventDefault();
                    mediaSelector.click();
                }
            });

            gallery.appendChild(card);

        });

        this.currentGallery = gallery;

        return gallery;
    }

    refresh() {
        this.sort();
        const selector = document.querySelector('.media-gallery');
        selector.replaceWith(this.gallery);
    }

    render() {
        const selector = document.querySelector('.media-section');
        const view = this.view;
        selector.replaceWith(view);
    }

    sort() {

        switch (this.sorter) {
            case 'likes':
                // Sort by DESCENDING number of likes
                this.collection.sort((a, b) => b.likes - a.likes);
                break;
            case 'date':
                this.collection.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title':
                this.collection.sort((a, b) => {
                    const nameA = a.title.toUpperCase();
                    const nameB = b.title.toUpperCase();
                    if (nameA < nameB) { return -1; }
                    if (nameA > nameB) { return 1; }
                    return 0;
                });
                break;
        }
    }
}