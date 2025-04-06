export default class theme {
    typeOf = 'Theme';

    pageBGColor = undefined;
    windowBGColor = undefined;
    textBGColor = undefined;
    textColor = undefined;
    borderColor = undefined;
    highlightColor = undefined;

    /**
     * sets a theme baised on supplied colors.
     * @param {color} pageBGColor 
     * @param {color} textBGColor 
     * @param {color} textColor 
     * @param {color} windowBGColor 
     * @param {color} borderColor 
     * @param {color} highlightColor 
     */
    constructor(pageBGColor,
        windowBGColor,
        textBGColor,
        textColor,
        borderColor,
        highlightColor) {

        this.pageBGColor = pageBGColor;
        this.windowBGColor = windowBGColor;
        this.textBGColor = textBGColor;
        this.textColor = textColor;
        this.borderColor = borderColor;
        this.highlightColor = highlightColor;
    }
    /**
     * applies the theme to an element.
     * @param {HTMLElement} element 
     */
    apply = (element) => {
        if (element.classList) {
            if (element.classList.contains('button-text') ||
                element.classList.contains('button-icon')) {
                element.style.backgroundColor = this.windowBGColor.value();
                element.style.borderColor = this.borderColor.value();
                element.style.color = this.textColor.value();
            }

            if (element.classList.contains('note-small')) {
                element.style.backgroundColor = this.windowBGColor.value();
                element.style.borderColor = this.borderColor.value();
                element.style.color = this.textColor.value();
            }

            if (element.classList.contains('note-full')) {
                element.style.backgroundColor = this.windowBGColor.value();
                element.style.borderColor = this.borderColor.value();
                element.style.color = this.textColor.value();
                const ti = element.firstChild
                ti.style.backgroundColor = this.highlightColor.value();
                const ta = ti.nextSibling;
                ta.style.backgroundColor = this.textBGColor.value();
                ta.style.color = this.textColor.value();
                ta.style.borderColor = this.borderColor.value();
            }
            if (element.classList.contains("category-expanded")) {
                //style for containing element
                element.style.backgroundColor = this.windowBGColor.value();
                element.style.borderCollapse = this.borderColor.value();
                element.style.color = this.textColor.value();

            }
        }
        if (element.typeOf == 'Note Vault') {

            element.element.style.backgroundColor = this.pageBGColor.value();

            element.titleContainerElement.style.backgroundColor = this.windowBGColor.value();
            element.titleContainerElement.style.borderColor = this.borderColor.value();

            element.titleElement.style.color = this.textColor.value();

            element.titleElementInput.style.backgroundColor = this.textBGColor.value();
            element.titleElementInput.style.borderColor = this.borderColor.value();
            element.titleElementInput.style.color = this.textColor.value();

            element.categorySectionElement.style.backgroundColor = this.windowBGColor.value();
            element.categorySectionElement.style.borderColor = this.borderColor.value();

            element.notePreviewBody.style.backgroundColor = this.textBGColor.value();
            element.notePreviewBody.style.borderColor = this.borderColor.value();
            element.notePreviewBody.style.color = this.textColor.value();

            element.notePreviewElement.style.backgroundColor = this.windowBGColor.value();
            element.notePreviewElement.style.borderColor = this.borderColor.value();

            element.notePreviewTitle.style.color = this.textColor.value();
            element.notePreviewTitle.style.backgroundColor = this.highlightColor.value();

        }


    }



}