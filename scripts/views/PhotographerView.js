import { ContactForm } from '../views/ContactForm.js';

export class PhotographerView {

    constructor(photographer) {
        this.photographer = photographer;
        this.contactForm = new ContactForm(photographer);
    }


    get picture() {

        const picture = document.createElement('img');
        picture.classList.add('photographer-picture');
        picture.setAttribute('src', this.photographer.portrait);
        picture.setAttribute('alt', this.photographer.name);
        return picture;

    }

    get card() {

        const link = document.createElement('a');
        link.setAttribute('href', './photographer.html?id=' + this.photographer.id);
        link.ariaLabel = this.photographer.name;

        const card = document.createElement('article');

        const img = this.picture;
        img.setAttribute('alt', '');

        const h2 = document.createElement('h2');
        h2.textContent = this.photographer.name;

        link.appendChild(img);
        link.appendChild(h2);

        const location = document.createElement('p');
        location.classList.add('location');
        location.textContent = this.photographer.city + ', ' + this.photographer.country;

        const tlp = document.createElement('p');
        tlp.classList.add('tagline');
        tlp.textContent = this.photographer.tagline;

        const pp = document.createElement('p');
        pp.classList.add('price');
        pp.textContent = this.photographer.price + '€/jour';

        card.appendChild(link);
        card.appendChild(location);
        card.appendChild(tlp);
        card.appendChild(pp);

        return card;

    }

    get profile() {

        const profile = document.createElement('section');
        profile.classList.add('profile');

        const wrapper = document.createElement('div');

        const title = document.createElement('h1');
        title.textContent = this.photographer.name;
        wrapper.appendChild(title);

        const location = document.createElement('p');
        location.classList.add('location');
        location.textContent = this.photographer.city + ', ' + this.photographer.country;
        wrapper.appendChild(location);

        const tagline = document.createElement('p');
        tagline.classList.add('tagline');
        tagline.textContent = this.photographer.tagline;
        wrapper.appendChild(tagline);

        profile.appendChild(wrapper);

        const contactButton = document.createElement('button');
        contactButton.classList.add('button', 'button-contact');
        contactButton.textContent = 'Contactez-moi';
        contactButton.addEventListener('click', () => {
            this.contactForm.displayModal();
        });

        profile.appendChild(contactButton);

        const img = this.picture;
        profile.appendChild(img);

        return profile;
    }


    get info() {

        const info = document.createElement('div');
        info.classList.add('extra-infos');

        const like = document.createElement('span');
        like.classList.add('heart', 'like-counter');
        like.textContent = this.photographer.medias.likes;

        const rate = document.createElement('span');
        rate.classList.add('daily-rate');
        rate.textContent = this.photographer.price + '€ / jour';

        info.appendChild(like);
        info.appendChild(rate);

        return info;
    }

    renderInfo() {
        const infoSelector = document.querySelector('.extra-infos');
        const info = this.info;
        infoSelector.replaceWith(info);
    }

    renderProfile() {
        const profileSelector = document.querySelector('.profile');
        const profile = this.profile;
        profileSelector.replaceWith(profile);
    }

}