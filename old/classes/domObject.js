import theme from './theme.js';

export default class domObject {
    element;
    children;
    parent;

    constructor(parent, element, theme, actions) {
        if (parent) this.parent = parent;
        if (element) this.element = this.#elementTemplate(element);
        if (theme) this.element.applyTheme(theme);
        if (actions) this.element.addActions(actions);
    }

    #elementTemplate(elementObj) {
        switch (elementObj.type) {
            case 'button':
                return buttonFactory(elementObj);
            case 'div':
                //do stuff
                break;
            case 'H1':
                //do stuff
                break;
            case 'H2':
                //do stuff
                break;
            case 'H3':
                //do stuff
                break;
            case 'input':
                //do stuff
                break;
            case 'textarea':
                //do stuff
                break;
            case 'main':
                //do stuff
                break;
            default:

        }
    }


    /**
     * 
     * @param {Object} elementObj object literal
     * {
     *      type: 'button',
     *      text: text,
     *      class: class,
     *      id: id,
     *  
     * }
     */
    buttonFactory(elementObj) {
        this.element = elementObj;
        Object.defineProperty(this.element, "DOMElement", document.createElement('button'));

        Object.defineProperty(this.element, 'text', {
            get() {
                return this.element.text;
            },
            set(newText) {
                this.element.text = newText;
                this.element.DOMElement.innerText = newText;
            },
        });

        Object.defineProperty(this.element, 'class', {
            get() {
                return this.element.class;
            },
            set(newClass) {
                this.element.class = newClass;
                this.element.DOMElement.className = newClass;
            },
        });
        Object.defineProperty(this.element, 'id', {
            get() {
                return this.element.id;
            },
            set(newId) {
                this.element.id = newId;
                this.element.DOMElement.id = newId;
            },
        });

        this.element.text = this.element.text;
        this.element.class = this.element.class;
        this.element.id = this.element.id;

        this.element.applyTheme = function (theme) {
            this.element.domObject.style.backgroundColor = theme.background;
            this.element.domObject.style.color = theme.text;
            this.element.domObject.style.borderColor = theme.border;
        };

        this.element.addActions = function (actions) {
            for (let action in actions) {
                this.element.domObject.addActionListener(action.event, action.func);
            }
        };

    }
}