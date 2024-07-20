class Video extends Media {
    constructor(JSONdata, collection) {
        super(JSONdata, collection);
        this.source = JSONdata.video;
        this.type = 'video';
    }
}