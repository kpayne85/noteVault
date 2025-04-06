import button from './button.js';

export default class note {
    typeOf = 'note';
    titleText = "New Note!";
    bodyText = "";
    removeFunc = undefined;
    /**
     * creates a note.
     * @param {String} noteClass 
     * @param {theme} elementTheme 
     */
    constructor(noteClass, elementTheme, removeFunc) {

        this.noteClass = noteClass;
        this.elementTheme = elementTheme;
        this.removeFunc = removeFunc;
        this.window = document.createElement("DIV");
        this.window.classList.add(this.noteClass);
        this.elementTheme.apply(this.window);
        this.title = document.createElement("H3");
        this.rmBtn = new button(this.elementTheme, "Remove", "button-text", this.removeFunc);

        this.window.appendChild(this.title);
        this.title.innerText = this.titleText;
        this.window.appendChild(this.rmBtn.button);

        this.window.addEventListener('click', this, false);
        this.window.addEventListener('mouseover', this, false);
        this.window.addEventListener('mouseout', this, false);
    }

    handleEvent(event) {
        switch (event.type) {
            case "click":
                if (event.target == this.window || event.target == this.title) this.expand();
                break;

            case "mouseover":
                if (event.target == this.window || event.target.parentElement == this.window) {
                    this.window.style.transform = 'scale(1.05, 1.05)';
                }
                break;
            case "mouseout":
                if (event.target == this.window || event.target.parentElement == this.window) {
                    this.window.style.transform = '';
                }
                break;
            case "keyup":
                if (event.target === document.getElementById('Active Body')) {
                    this.bodyText = event.target.value;
                    if (event.key == 'Enter' && this.titleText == 'New Note!') {
                        event.preventDefault();
                        this.titleText = event.target.value;
                        event.target.previousSibling.innerText = this.titleText;
                        event.target.value = '';
                        this.title.innerText = this.titleText;
                        this.bodyText = '';
                    }
                }
                break;
            default:
                break;
        }
    }

    /**
     * Expands the note to full screen.
     */
    expand = () => {
        const expandedWindow = document.createElement("Div");
        const expandedTitle = document.createElement('H3');
        const expandedBody = document.createElement('textarea');
        const closeBtn = new button(this.elementTheme, "Close", "button-text", () => { expandedWindow.remove() });

        expandedWindow.classList.add("note-full");
        expandedWindow.appendChild(expandedTitle);
        expandedWindow.appendChild(expandedBody);
        expandedWindow.appendChild(closeBtn.button);
        this.elementTheme.apply(expandedWindow);

        expandedTitle.id = "Active Title";
        expandedTitle.innerText = this.titleText;
        expandedBody.id = "Active Body";
        expandedBody.value = this.bodyText;

        expandedBody.addEventListener('keyup', this, false);
        console.log(document.querySelector('body'));
        document.querySelector('body').appendChild(expandedWindow);

    }
}