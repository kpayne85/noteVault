import color from "./color.js";
import theme from "./theme.js";
import button from "./button.js";

export default class colorSelector {
    //VARIABLES
    typeOf = 'Color Selector';
    title = 'Color Selector';
    labelNameArray = ["Page Background Color: ", "Window Background Color; ",
        "Textbox Background Color: ", "Text Color: ",
        "Border Color: ", "Highlight Color: "];
    editingObject = undefined;
    importTheme = undefined;
    exportTheme = undefined;

    //ELEMENTS
    backgroundDiv = undefined;
    windowElement = undefined;
    titleElement = undefined;
    descriptionElement = undefined;
    colorHolderElement = undefined;
    labelElementArray = undefined;
    colorElementArray = undefined;
    okBtn = undefined;
    cancelBtn = undefined;

    constructor(editingObject) {
        this.importTheme = editingObject.elementTheme;
        this.exportTheme = new theme(this.importTheme.pageBGColor.value(),
            this.importTheme.windowBGColor.value(),
            this.importTheme.textBGColor.value(),
            this.importTheme.textColor.value(),
            this.importTheme.borderColor.value(),
            this.importTheme.highlightColor.value());

        //CREATE HTML ELEMENTS
        backgroundDiv = document.createElement('DIV');
        windowElement = document.createElement('DIV');
        titleElement = document.createElement('H2');
        descriptionElement = document.createElement('H3');
        colorHolderElement = document.createElement('DIV');
        labelElementArray = [];
        colorElementArray = [];
        for (let name of this.labelNameArray) {
            this.labelElementArray.push(document.createElement("label"));
            this.labelElementArray[this.labelElementArray.length - 1].innerText = name;
            this.labelElementArray.push(document.createElement("input[type='color']"));
        }
        okBtn = new button(this.exportTheme, "Okay", 'button-text', this.clickOK);
        cancelBtn = new button(this.exportTheme, "Cancel", 'button-text', this.clickCancel);
    }

    //SET IDS

}