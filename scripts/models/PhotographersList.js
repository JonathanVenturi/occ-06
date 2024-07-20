class PhotographersList {

    constructor(JSONData) {
        this.JSONData = JSONData;
    }

    async getList() {
        const photographersList = [];
        const photographersData = await this.JSONData.getPhotographersData();

        for await (const photographer of photographersData) {
            const photographerCollection = await this.JSONData.getMediaFromPhotographer(photographer.id);
            const photographerObject = new Photographer(photographer, photographerCollection);
            photographersList.push(photographerObject);
        }
        return photographersList;
    }

    async getView() {
        const photographersList = await this.getList();

        const view = new PhotographersListView(photographersList);

        return view;
    }

}