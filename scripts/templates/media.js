function mediaTemplate(data) {

    const { id, title, image, video, date, likes, price } = data;

    function getMedia() {
        const media = document.createElement(image ? 'img' : 'video');
        media.classList.add('media');
        if (image) {
            media.setAttribute("src", 'assets/medias/' + image);
            media.setAttribute("alt", title);
        } else if (video) {
            const source = document.createElement('source');
            source.setAttribute('src', 'assets/medias/' + video);
            media.appendChild(source);
        }
        return media;
    }

    function getMediaCard() {

        const article = document.createElement('article');

        const media = this.getMedia();
        article.appendChild(media);

        const info = document.createElement('div');
        info.classList.add('media-info');

        const h2 = document.createElement('h2');
        h2.textContent = title;
        info.appendChild(h2);

        const heart = document.createElement('span');
        heart.textContent = likes;
        heart.classList.add('heart');
        info.appendChild(heart);

        article.appendChild(info);

        return article;

    }

    return {id, title, getMedia, getMediaCard };

}