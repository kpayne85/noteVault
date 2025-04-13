import category from "./category.js";
import button from "./button.js";

export default class vault {
    name = "";
    categoryList = [];
    elementTheme = undefined;
    element = undefined;
    titleElement = undefined;
    titleContainerElement = undefined;
    removeVaultBtn = undefined;
    mainElement = undefined;
    categorySectionElement = undefined;
    categoryListElement = undefined;
    newCategoryBtn = undefined;
    notePreviewElement = undefined;
    notePreviewTitle = undefined;
    notePreviewBody = undefined;

    /**
     * Creates a vault with theme inputted
     * @param {theme} elementTheme 
     */
    constructor(elementTheme) {
        this.name = "New Vault"
        this.elementTheme = elementTheme;
        this.typeOf = 'Note Vault';

        //CREATE ELEMENTS
        this.element = document.createElement("DIV");
        this.titleContainerElement = document.createElement("DIV");
        this.titleElement = document.createElement("H1");
        this.titleElementInput = document.createElement("INPUT");
        this.removeVaultBtn = new button(this.elementTheme, "Delete Vault", "button-text", this.removeVault);
        this.mainElement = document.createElement("MAIN");
        this.categorySectionElement = document.createElement("DIV");
        this.categoryListElement = document.createElement("DIV");
        this.newCategoryBtn = new button(this.elementTheme, "New Category", "button-text", this.newCategory);
        this.notePreviewElement = document.createElement("DIV");
        this.notePreviewTitle = document.createElement("H2");
        this.notePreviewBody = document.createElement("P");

        //NEST ELEMENTS
        this.element.appendChild(this.titleContainerElement);
        this.element.appendChild(this.mainElement);

        this.titleContainerElement.appendChild(this.titleElement);
        this.titleContainerElement.appendChild(this.removeVaultBtn.button);

        this.mainElement.appendChild(this.categorySectionElement);
        this.mainElement.appendChild(this.notePreviewElement);

        this.categorySectionElement.appendChild(this.categoryListElement);
        this.categorySectionElement.appendChild(this.newCategoryBtn.button);

        this.notePreviewElement.appendChild(this.notePreviewTitle);
        this.notePreviewElement.appendChild(this.notePreviewBody);

        //SET IDS
        this.element.id = 'page';
        this.titleContainerElement.id = 'title-container';
        this.titleElement.id = 'vault-title';
        this.removeVaultBtn.button.id = 'remove-vault-btn';
        this.categorySectionElement.id = 'category-section';
        this.categoryListElement.id = 'category-list';
        this.newCategoryBtn.button.id = 'new-category-btn';
        this.notePreviewElement.id = 'note-preview';
        this.notePreviewTitle.id = 'note-preview-title';
        this.notePreviewBody.id = 'note-preview-body';
        this.mainElement.id = 'main-element';

        //ADD LISTENERS
        this.element.addEventListener('dblclick', this, false);
        this.element.addEventListener('mouseover', this, false);
        window.addEventListener('resize', this, false);


        //APPLY THEME
        this.elementTheme.apply(this);

        //SET NAME
        this.titleElement.innerText = this.name;
        this.notePreviewBody.innerText = "Note Preview Body";
        this.notePreviewTitle.innerText = 'Note Preview';

    }

    setSize = () => {
        let y = window.visualViewport.height;
        let top = this.categorySectionElement.offsetTop;
        let mHeight = `${y - top - 20}px`;
        this.categorySectionElement.style.maxHeight = mHeight;
        this.notePreviewElement.style.maxHeight = mHeight;
    }

    handleEvent(event) {
        switch (event.type) {
            case 'dblclick':
                switch (event.target) {
                    case this.titleElement:
                        this.changeName();
                        break;
                    default:
                }
                break;
            case 'mouseover':
                this.updatePreview(this.findTarget(event.target));
                //console.log(event);
                break;
            case 'keyup':
                switch (event.target) {
                    case this.titleElementInput:
                        this.changeNameEvent(event);
                        break;
                    default:
                }
                break;
            case 'resize':
                this.setSize();
                break;
            default:
        }
    }

    removeVault = () => {
        //do stuff to delete the vault
    }

    newCategory = () => {
        const c = new category(this.elementTheme);
        this.categoryListElement.appendChild(c.containerElement);
        this.categoryList.push(c);
    }

    changeName = () => {
        this.titleElementInput.type = 'text';
        this.titleElementInput.value = this.name;
        this.titleElementInput.addEventListener('keyup', this, false);
        this.titleElement.replaceWith(this.titleElementInput);
    }

    changeNameEvent = (event) => {

        switch (event.key) {
            case "Enter":

                event.preventDefault();
                this.titleElementInput.removeEventListener('keyup', this, false);
                this.titleElementInput.replaceWith(this.titleElement);
                this.titleElement.innerText = this.name;
            default:
                this.name = this.titleElementInput.value;
        }
    }

    findTarget = (target) => {
        // const t = this.categoryList.map((element) => {
        //     return element.notes.map((e) => {
        //         return e.window === target;
        //     });
        // });
        // let found = undefined;
        // for (let i = 0; i < t.length; i++) {
        //     let t2 = t[i];
        //     for (let j = 0; j < t2.length; j++) {
        //         if (t2[j]) {
        //             found = this.categoryList[i].notes[j];
        //             break;
        //         }
        //     }

        // }
        // I was very tired ^


        let found = undefined;
        for (let i = 0; i < this.categoryList.length; i++) {
            for (let j = 0; j < this.categoryList[i].notes.length; j++) {
                if (this.categoryList[i].notes[j].window === target) {
                    found = this.categoryList[i].notes[j];
                }
            }
        }
        return found;
    }

    updatePreview = (note) => {
        if (note) {
            this.notePreviewTitle.innerText = note.titleText;
            this.notePreviewBody.innerText = note.bodyText;
        }
    }

}