export default class button {
    buttonFunc = "";
    typeOf = 'Button';
    /**
     * creates a new button
     * @param {theme} elementTheme 
     * @param {String} buttonText 
     * @param {String} btnClass css theme
     * @param {function} buttonFunc 
     */
    constructor(elementTheme, buttonText, btnClass, buttonFunc) {
        this.button = document.createElement('BUTTON');
        this.elementTheme = elementTheme;

        this.button.innerText = buttonText;
        this.button.classList.add(btnClass);
        this.buttonFunc = buttonFunc;
        this.elementTheme.apply(this.button);
        this.button.addEventListener('click', this, false);
    }

    handleEvent(event) {
        if (event.type == 'click') this.buttonFunc(event);
    }

}