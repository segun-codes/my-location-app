export class Modal {
    constructor(contentId, fallbackText) {
        this.fallbackText = fallbackText;
        this.contentTemplateEl = document.getElementById(contentId);

        //to access <template> with id="modal-template"
        this.modalTemplateEl = document.getElementById('modal-template');
    }      

    //this ends up displaying the spinner
    show() {

        //checking if browser supports <template> tag
        //by checking if property 'content' exists on the tag <template>
        if('content' in document.createElement('template')) {
            const modalElements = document.importNode(this.modalTemplateEl.content, true);
            
            //the modal (or overlay)
            this.modalElement = modalElements.querySelector('.modal');

            //the background/backdrop for the overlay
            this.backdropElement = modalElements.querySelector('.backdrop');

            //getting content of the html element whose contentId was passed to the constructor
            const contentElement = document.importNode(this.contentTemplateEl.content, true);
            
            //the appended children content of the element of contentId 
            //passed to the constructor
            this.modalElement.appendChild(contentElement);

            //inserting the modalElement setup just above into the body tag
            document.body.insertAdjacentElement('afterbegin', this.modalElement);
            document.body.insertAdjacentElement('afterbegin', this.backdropElement);

        } else {
            alert(this.fallbackText);
        }           
    }

    hide() {
        if(this.modalElement) {

            //remove modal and spinner from DOM 
            document.body.removeChild(this.modalElement);

            //remove backdrop from DOM as well
            document.body.removeChild(this.backdropElement);
            this.modalElement = null;
            this.backdropElement = null;
        }
    }
}
