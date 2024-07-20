async function init() {
    // Instantiating JSON data object 
    const JsonData = new JsonDataApi('./data/photographers.json');

    // Creating the photographers list
    const photographersListObject = new PhotographersList(JsonData);

    // Getting the view for the photographers list
    const photographersListView = await photographersListObject.getView();

    // Displaying the view in the right place
    const photographersSection = document.querySelector(".photographer_section");
    photographersListView.classList.add('photographer_section');
    photographersSection.replaceWith(photographersListView);
}

init();