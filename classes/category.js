import button from './button.js';
import note from './note.js';

export default class category {
    typeOf = 'category';
    name = "";
    status = "Expanded";
    notes = [];
    elementTheme = undefined;
    containerElement = undefined;
    titlebarElement = undefined;
    expandColapseElement = undefined;
    nameElement = undefined;
    removeElement = undefined;
    noteContainerElement = undefined;
    newNoteElement = undefined;
    nameInputElement = undefined;

    /**
     * Constructs a new category with the included theme.
     * @param {theme} elementTheme 
     */
    constructor(elementTheme) {
        this.elementTheme = elementTheme;
        this.name = "New Category";

        //CREATE ELEMENTS
        this.containerElement = document.createElement('DIV');
        this.titlebarElement = document.createElement('DIV');
        this.expandColapseElement = new button(this.elementTheme, "Colapse", "button-text", this.toggle);
        this.nameElement = document.createElement('H2');
        this.removeElement = new button(this.elementTheme, "Remove", "button-text", this.removeNote);
        this.noteContainerElement = document.createElement('div');
        this.newNoteElement = new button(this.elementTheme, "New note", "button-text", this.newNote);

        //NEST ELEMENTS
        this.containerElement.appendChild(this.titlebarElement);
        this.titlebarElement.appendChild(this.expandColapseElement.button);
        this.titlebarElement.appendChild(this.nameElement);
        this.titlebarElement.appendChild(this.removeElement.button);
        this.containerElement.appendChild(this.noteContainerElement);
        this.containerElement.appendChild(this.newNoteElement.button);

        //SET CLASSES
        this.containerElement.classList.add("category-expanded");

        //SET IDS
        this.noteContainerElement.id = "note-container";

        //ADD EVENT LISTENERS
        this.containerElement.addEventListener('dblclick', this, false);

        //APPLY THEME
        this.elementTheme.apply(this.containerElement);

        //SET NAME
        this.nameElement.innerText = this.name;
    }

    handleEvent(event) {
        switch (event.type) {
            case 'dblclick':
                switch (event.target) {
                    case this.nameElement:
                        this.changeName();
                        break;
                }
            case 'keyup':

                switch (event.target) {
                    case this.nameInputElement:
                        this.changeNameEvent(event);
                        break;
                    default:
                }
                break;
            default:
        }
    }

    changeName = () => {
        this.nameInputElement = document.createElement("INPUT")
        this.nameInputElement.type = 'text';
        this.nameInputElement.value = this.name;
        this.nameInputElement.addEventListener('keyup', this, false);
        this.nameElement.replaceWith(this.nameInputElement);
    }

    changeNameEvent = (event) => {

        switch (event.key) {
            case "Enter":

                event.preventDefault();
                this.nameInputElement.removeEventListener('keyup', this, false);
                this.nameInputElement.replaceWith(this.nameElement);
                this.nameElement.innerText = this.name;
            default:
                this.name = this.nameInputElement.value;
        }
    }

    newNote = () => {
        const n = new note('note-small', this.elementTheme, this.removeNote);
        this.noteContainerElement.appendChild(n.window);
        this.notes.push(n);
    }

    toggle = () => {
        switch (this.status) {
            case "Expanded":

                // this.noteContainerElement.style.visibility = 'hidden';
                // this.noteContainerElement.style.position = 'absolute';
                // this.noteContainerElement.style.width = 0;
                // this.noteContainerElement.style.height = 0;

                // this.newNoteElement.button.style.visibility = 'hidden';
                // this.newNoteElement.button.style.position = 'absolute';
                // this.newNoteElement.button.style.width = 0;
                // this.newNoteElement.button.style.height = 0;
                this.expandColapseElement.button.innerText = "Expand";
                this.status = "Colapsed";
                this.containerElement.classList.remove("category-expanded");
                this.containerElement.classList.add("category-colapsed");
                break;
            case "Colapsed":

                // this.noteContainerElement.style.visibility = 'visible';
                // this.noteContainerElement.style.position = '';

                // this.noteContainerElement.style.width = '';
                // this.noteContainerElement.style.height = '';

                // this.newNoteElement.button.style.visibility = 'visible';
                // this.newNoteElement.button.style.position = '';

                // this.newNoteElement.button.style.width = '';
                // this.newNoteElement.button.style.height = '';
                this.expandColapseElement.button.innerText = "Colapse";
                this.status = "Expanded"; this.containerElement.classList.remove("category-colapsed");
                this.containerElement.classList.add("category-expanded");
                break;
            default:

        }
    }

    removeNote = (event) => {
        //do stuff here
    }
}