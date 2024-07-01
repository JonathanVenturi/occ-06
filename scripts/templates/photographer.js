function photographerTemplate(data) {

    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getPhotographerPicture() {
        const img = document.createElement('img');
        img.classList.add('photographer-picture');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);
        return img;
    }

    function getUserCardDOM() {
        const link = document.createElement('a');
        link.setAttribute('href', `./photographer.html?id=${id}`);

        const article = document.createElement('article');
        const img = this.getPhotographerPicture();
        const h2 = document.createElement('h2');
        h2.textContent = name;

        link.appendChild(img);
        link.appendChild(h2);

        const location = document.createElement('p');
        location.classList.add('location');
        location.textContent = city + ', ' + country;

        const tlp = document.createElement('p');
        tlp.classList.add('tagline');
        tlp.textContent = tagline;

        const pp = document.createElement('p');
        pp.classList.add('price');
        pp.textContent = price + '€/jour';

        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(tlp);
        article.appendChild(pp);

        return article;
    }

    function getSimpleProfile() {

        const profile = document.createElement('div');
        profile.classList.add('photographer_profile');

        const title = document.createElement('h1');
        title.textContent = name;
        profile.appendChild(title);

        const location = document.createElement('p');
        location.classList.add('location');
        location.textContent = city + ', ' + country;

        profile.appendChild(location);

        const tlp = document.createElement('p');
        tlp.classList.add('tagline');
        tlp.textContent = tagline;

        profile.appendChild(tlp);

        return profile;
    }




    return { name, getUserCardDOM, getPhotographerPicture, getSimpleProfile }
}