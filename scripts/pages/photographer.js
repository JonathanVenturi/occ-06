async function getPhotographersData() {
    const response = await fetch('./data/photographers.json');
    const photographersData = await response.json();
    return photographersData;
}

function sortMediaList(mediaList, sort) {

    switch (sort) {

        case 'likes':
            // Sort by DESCENDING number of likes
            mediaList.sort((a, b) => b.likes - a.likes);
            break;

        case 'date':
            mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;

        case 'title':
            mediaList.sort((a, b) => {
                const nameA = a.title.toUpperCase();
                const nameB = b.title.toUpperCase();
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            });
            break;
    }
}

async function displayMedia(mediaList) {

    const mediaSection = document.querySelector(".media-gallery");

    mediaSection.innerHTML = '';

    mediaList.forEach((media) => {
        const mediaModel = mediaTemplate(media);
        const mediaCard = mediaModel.getMediaCard();

        const mediaSelector = mediaCard.querySelector('.media');
        mediaSelector.addEventListener('click', createLightbox.bind(null, mediaModel, mediaList), false);

        mediaSection.appendChild(mediaCard);

    });
}

async function updateProfile(photographerInfo) {

    const photographerSection = document.querySelector('.photographer_hero_section');
    const photographerModel = photographerTemplate(photographerInfo);
    const photographerProfile = photographerModel.getSimpleProfile();
    const profilePicture = photographerModel.getPhotographerPicture();

    photographerSection.prepend(photographerProfile);
    photographerSection.appendChild(profilePicture);

}

async function createLightbox(mediaModel, mediaList) {

    const currentIndex = mediaList.findIndex((media) => media.id == mediaModel.id);

    // Caching selectors for DOM
    const modal = document.querySelector('.modal-anchor');
    const lightboxModal = document.querySelector('.modal-lightbox');

    // Previous button
    const previousButton = document.createElement('span');
    previousButton.classList.add('lightbox-button', 'lightbox-button-previous');
    previousButton.textContent = '\u2B9C';

    // If not first
    if (currentIndex != 0) {
        const previousMediaModel = mediaTemplate(mediaList[currentIndex - 1]);

        previousButton.addEventListener('click', function displayPreviousMedia(e) {
            createLightbox(previousMediaModel, mediaList);
        });
    }

    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    const media = mediaModel.getMedia();

    if(media.tagName == 'VIDEO') {
        media.controls = true;
    }


    lightboxContent.appendChild(media);
    const title = document.createElement('p');
    title.textContent = mediaModel.title;
    title.classList.add('.lightbox-title');
    lightboxContent.appendChild(title);

    // Next button
    const nextButton = document.createElement('span');
    nextButton.classList.add('lightbox-button', 'lightbox-button-next');
    nextButton.textContent = '\u2B9E';

    if (currentIndex < mediaList.length - 1) {
        const nextMediaModel = mediaTemplate(mediaList[currentIndex + 1]);

        nextButton.addEventListener('click', (e) => {
            createLightbox(nextMediaModel, mediaList);
        });
    }

    // Close button
    const closeButton = document.createElement('span');
    closeButton.classList.add('lightbox-button', 'lightbox-button-close');
    closeButton.textContent = '\u{1f7ab}';

    closeButton.addEventListener('click', (e) => {
        modal.style.display = 'none';
        lightboxModal.style.display = 'none';
        //contactModal.style.display = 'none';
    });

    // Attach elements to modal and display
    lightboxModal.innerHTML = '';
    lightboxModal.appendChild(previousButton);
    lightboxModal.appendChild(lightboxContent);
    lightboxModal.appendChild(nextButton);
    lightboxModal.appendChild(closeButton);

    modal.style.display = 'block';
    lightboxModal.style.display = 'flex';
}


async function init() {

    // Getting photographer's ID from URL
    const URLParams = new URLSearchParams(window.location.search);
    const PID = URLParams.get('id');

    // Getting photographer's info and media list
    const photographersData = await getPhotographersData();
    const photographerInfo = photographersData['photographers'].find((photographer) => photographer.id == PID);
    const mediaList = photographersData['media'].filter((media) => media.photographerId == PID);

    // Sorting gallery by likes by default
    sortMediaList(mediaList, 'likes');

    // Updating page title and content
    document.title = 'Fisheye - ' + photographerInfo.name;
    updateProfile(photographerInfo);
    displayMedia(mediaList);

    // Count likes and update the HTML
    const likesCount = mediaList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes, 0
    );
    const extraInfos = document.querySelector('.like-counter');
    extraInfos.innerHTML = likesCount;

    // Update daily rate
    const dailyRate = document.querySelector('.daily-rate');

    dailyRate.innerHTML = photographerInfo.price + '€ / jour';


    // Adding behavior for select dropdown for sorting
    const mediaSortSelect = document.getElementById('media-sort-select');
    mediaSortSelect.addEventListener('change', (e) => {
        sortMediaList(mediaList, mediaSortSelect.value);
        displayMedia(mediaList);
    })

    // Adding behavior for modal buttons
    const modal = document.querySelector('.modal-anchor');
    const lightboxModal = document.querySelector('.modal-lightbox');
    const contactModal = document.querySelector('.modal-contact');

    const contactButton = document.querySelector('.button-contact');
    const closeModalButton = document.querySelector('.modal-button-close');

    closeModalButton.addEventListener('click', (e) => {
        modal.style.display = 'none';
        lightboxModal.style.display = 'none';
        contactModal.style.display = 'none';
    });

    contactButton.addEventListener('click', (e) => {
        modal.style.display = 'flex';
        contactModal.style.display = 'flex';
    });

    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log(document.getElementById('surname').value);
        console.log(document.getElementById('name').value);
        console.log(document.getElementById('email').value);
        console.log(document.getElementById('message').value);

        contactForm.reset();

        modal.style.display = 'none';
        contactModal.style.display = 'none';

    });

}

init();