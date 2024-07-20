class ContactForm {

    constructor(photographer) {

        const modalHeader = document.createElement('header');
        const title = document.createElement('h2');
        title.textContent = 'Contacter ' + photographer.name;
        modalHeader.appendChild(title);
        
        const closeButton = document.createElement('span');
        closeButton.classList.add('modal-button', 'modal-button-close');
        closeButton.textContent = '\u{1f7ab}';
        
        closeButton.addEventListener('click', () => {
           this.closeModal(); 
        });
                
        modalHeader.appendChild(closeButton);

        const contactForm = document.createElement('form');
        contactForm.id = 'contact-form';

        const surnameLabel = document.createElement('label');
        surnameLabel.htmlFor = 'surname';
        surnameLabel.textContent = 'Prénom';
        contactForm.appendChild(surnameLabel);
        const surnameInput = document.createElement('input');
        surnameInput.id = 'surname';
        surnameInput.type = 'text';
        contactForm.appendChild(surnameInput);

        const nameLabel = document.createElement('label');
        nameLabel.htmlFor = 'name';
        nameLabel.textContent = 'Nom';
        contactForm.appendChild(nameLabel);
        const nameInput = document.createElement('input');
        nameInput.id = 'name';
        nameInput.type = 'text';
        contactForm.appendChild(nameInput);

        const mailLabel = document.createElement('label');
        mailLabel.htmlFor = 'email';
        mailLabel.textContent = 'Email';
        contactForm.appendChild(mailLabel);
        const mailInput = document.createElement('input');
        mailInput.id = 'email';
        mailInput.type = 'email';
        contactForm.appendChild(mailInput);

        const messageLabel = document.createElement('label');
        messageLabel.htmlFor = 'message';
        messageLabel.textContent = 'Votre message';
        contactForm.appendChild(messageLabel);
        const messageInput = document.createElement('textarea');
        messageInput.id = 'message';
        contactForm.appendChild(messageInput);

        const submitButton = document.createElement('button');
        submitButton.id = 'button-contact-submit';
        submitButton.classList.add('button');
        submitButton.textContent = 'Envoyer';
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.submitForm();
        });
        contactForm.appendChild(submitButton);

        const contactModal = document.createElement('div');
        contactModal.classList.add('modal-contact');
        contactModal.appendChild(modalHeader);
        contactModal.appendChild(contactForm);

        this.modal = contactModal;

        return contactModal;

    }


    submitForm() {



        
        this.closeModal();
    }


    closeModal() {


        const modalAnchor = document.querySelector('.modal-anchor');
        modalAnchor.style.display = 'none';

        this.modal.remove();

    }

}