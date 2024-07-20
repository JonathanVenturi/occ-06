class PhotographersListView {

    constructor(photographersList) {

        const view = document.createElement('section');
        
        photographersList.forEach(async photographer => {
            const photographerView = new PhotographerView(photographer);
            view.appendChild(photographerView.card);            
        });
        
        return view;
    }
}