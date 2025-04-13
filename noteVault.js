class theme {
    #colors;
    constructor(colorObjArr) {
        this.#colors = [];
        if (colorObjArr) this.theme = colorObjArr;

    }

    /**
     * Takes a string for the property type a color apples to, and a color string.
     * @param {string} property 
     * @param {string} color 
     * @returns colorObject
     */
    #colorFactory(p, c) {
        return {
            property: p,
            color: c,
        };
    }

    /**
     * Creates get and set functions for the color object.
     * @param {colorObj} colorObj 
     */
    #colorGetterSetterFactory(colorObj) {
        Object.defineProperty(this, colorObj.property, {
            get() {
                return colorObj.color;
            },
            set(color) {
                if (this.#colorValidated(color)) {
                    colorObj.color = color;
                } else {
                    const colorErr = "color must be a valid color format, e.g.\nrgb(0,0,0,0)\nrgba(0,0,0,0)\n#000000\nhsl(0,0,0)";
                    throw new TypeError(colorErr);
                }
            },
            configurable: true,
        });
    }

    /**
     * Takes a color object made by colorFactory and adds it to the color array.
     * @param {colorObj} colorObj 
     */
    #addColorToTheme(colorObj) {
        this.#colors.push(colorObj);
        this.#colorGetterSetterFactory(colorObj);
    }

    /**
     * Tests if a string properly describes an rgb color.
     * @param {string} color 
     * @returns bool
     */
    #isValidRGB(color) {
        let idx1 = color.indexOf("(");
        let idx2 = color.indexOf(")");
        if (idx1 === -1 || idx2 === -1) return false;
        let sub = color.substring(idx1 + 1, idx2);
        let colorArray = sub.split(",");
        if (colorArray.length !== 3) return false;
        colorArray.forEach(function (element) {
            return parseInt(element);
        });
        for (let colorValue of colorArray) {
            if (colorValue < 0 || colorValue > 255) return false;
        }
        return true;
    }

    /**
     * Tests if a string properly describes an rgba color.
     * @param {string} color 
     * @returns bool
     */
    #isValidRGBA(color) {
        let idx1 = color.indexOf("(");
        let idx2 = color.indexOf(")");
        if (idx1 === -1 || idx2 === -1) return false;
        let sub = color.substring(idx1 + 1, idx2);
        let colorArray = sub.split(",");
        if (colorArray.length !== 4) return false;
        let a = parseFloat(colorArray.splice(3, 1)[0]);
        if (a < 0 || a > 1) return false;
        colorArray.forEach(function (element) {
            return parseInt(element);
        });
        for (let colorValue of colorArray) {
            if (colorValue < 0 || colorValue > 255) return false;
        }
        return true;
    }

    /**
     * Tests if a string properly describes an hex color.
     * @param {string} color 
     * @returns bool
     */
    #isValidHex(color) {
        const hexMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        const colorArr = color.split("");
        if (colorArr.length !== 7) return false;

        //yes, starting at 1 as 0 should be #
        for (let i = 1; i < colorArr.length; i++) {
            if (!hexMap.includes(colorArr[i])) return false;
        }
        return true;
    }

    /**
     * Tests if a string properly describes an hsl color.
     * @param {string} color 
     * @returns bool
     */
    #isValidHSL(color) {
        let idx1 = color.indexOf("(");
        let idx2 = color.indexOf(")");
        if (idx1 === -1 || idx2 === -1) return false;
        let sub = color.substring(idx1 + 1, idx2);
        let colorArray = sub.split(",");
        if (colorArray.length !== 3) return false;
        if (colorArray[1][colorArray[1].length - 1] !== "%") return false;
        if (colorArray[2][colorArray[2].length - 1] !== "%") return false;

        colorArray.forEach(function (element) {
            return parseInt(element);
        });
        if (colorArray[0] < 0 || colorArray[0] > 360) return false;
        if (colorArray[1] < 0 || colorArray[1] > 100) return false;
        if (colorArray[2] < 0 || colorArray[2] > 100) return false;


        return true;
    }

    /**
     * returns if a string is a properly formatted color.
     * @param {String} color 
     * @returns bool
     */
    #colorValidated(color) {

        //Determine Type of color
        let isOfType = 'Error';
        if (color.includes('rgb')) isOfType = 'rgb';
        if (color.includes('rgba')) isOfType = 'rgba';
        if (color.includes('#')) isOfType = 'hex';
        if (color.includes('hsl')) isOfType = 'hsl';

        switch (isOfType) {
            case 'rgb':
                return this.#isValidRGB(color);
            case 'rgba':
                return this.#isValidRGBA(color);
            case 'hex':
                return this.#isValidHex(color);
            case 'hsl':
                return this.#isValidHSL(color);
            case 'Error':
                return false;
            default:
                return false;
        }

    }

    /**
     * Adds a new color to the theme.
     * @param {String} property 
     * @param {String} color 
     */
    newColor(property, color) {
        if (typeof (property) !== 'string' || typeof (color) !== 'string') {
            throw new TypeError("Both property and color must be of type string.");
        }
        if (property.trim() === "") {
            throw new TypeError("Property must be a non-empty string.");
        }
        if (!this.#colorValidated(color)) {
            const colorErr = "color must be a valid color format, e.g.\nrgb(0,0,0,0)\nrgba(0,0,0,0)\n#000000\nhsl(0,0,0)";
            throw new TypeError(colorErr);
        }

        const colorObj = this.#colorFactory(property, color);
        this.#addColorToTheme(colorObj);
    }

    /**
     * removes a color from the theme by property name.
     * @param {String} property 
     * @returns 
     */
    removeColor(property) {
        if (typeof (property) !== 'string') {
            throw new TypeError("property must be a string type.");
        }

        const removeIdx = this.#colors.findIndex(function (colorObj) {
            return property === colorObj.property;
        });

        if (removeIdx === -1) return false;

        delete this[property];
        this.#colors.splice(removeIdx, 1);


        return true;
    }

    /**
     * Returns a copy of the colors array
     */
    get theme() {
        const output = this.#colors.slice();
        return output;
    }

    /**
     * sets the theme to the inputted colorObjArray.
     */
    set theme(colorObjArr) {
        //type checking

        colorObjArr.forEach(function (colorObj) {
            const test1 = colorObj.hasOwnProperty("property");
            const test2 = colorObj.hasOwnProperty("color");

            if (!test1 || !test2) {
                throw new TypeError("Incorrect colorObj passed.");
            }
        });

        //probably need to delete current colors array first.
        colorObjArr.forEach((colorObj) => {
            this.removeColor(colorObj.property);
            this.newColor(colorObj.property, colorObj.color);
        });

    }
}

class domObject {

    delete() {
        if (this.children) {
            for (let child in this.children) {
                child.delete();
            }
        }
        this.element.delete();
        if (parent) {
            parent.killChild(this);
        }
    }

    killChild(child) {
        let childIndex = this.children.findIndex(function (c) {
            return c === child;
        });
        if (childIndex !== -1) {
            this.children.splice(childIndex, 1);
        }
    }

    inheritFromParent(parent) {
        if (parent) {
            this.parent = parent;
            this.theme = parent.theme;
        }
    }

    applyTemplate(template) {
        if (template) {
            if (template.hasOwnProperty("actions")) {
                this.actions = template.actions;
            }
            if (template.hasOwnProperty("id")) {
                this.id = template.id;
            }
            if (template.hasOwnProperty("cssClass")) {
                this.cssClass = template.cssClass;
            }
            if (template.hasOwnProperty("text")) {
                this.text = template.text;
            }
        }
    }

    appendSelf(domElement) {
        domElement.appendChild(this.element);
    }

    get theme() {
        return this._theme;
    }

    set theme(t) {
        this._theme = t;
        this.#applyTheme();
    }

    #applyTheme() {
        for (let i in this.implements) {
            let prop = this.implements[i];
            switch (prop) {
                case 'text':
                    this.element.style.color = this.theme[prop];
                    break;
                case 'background':
                    this.element.style.backgroundColor = this.theme[prop];
                    break;
                case 'window':
                    this.element.style.backgroundColor = this.theme[prop];
                    break;
                case 'textBackground':
                    this.element.style.backgroundColor = this.theme[prop];
                    break;
                case 'border':
                    this.element.style.borderColor = this.theme[prop];
                    break;
                case 'accent':
                    this.element.style.backgroundColor = this.theme[prop];
                    break;
                default:
            }
        }
    }
    get id() {
        return this._id;
    }

    set id(ID) {
        this._id = ID;
        this.element.id = ID;
    }
    get cssClass() {
        return this._cssClass;
    }

    set cssClass(CSSCLASS) {
        this._cssClass = CSSCLASS;
        document.querySelector('body').classList.add()
        this.element.classList.add(CSSCLASS);
    }

    get text() {
        return this._text;
    }

    set text(TEXT) {
        this._text = TEXT;
        this.element.innerText = TEXT;
    }

    get actions() {
        return this._actions;
    }

    set actions(actionList) {
        //set the actions up
        if (!this._actions) this._actions = [];
        for (let action in actionList) {
            this._actions.push(action);
            this.element.addActionListener(action.event, action.func);
        }
    }

    createChild(name, type, template, actions) {
        if (!this.children) this.children = [];
        switch (type.toUpperCase()) {
            case 'DIV':
                this.children.push(new div(name, this, template));
                this.children[this.children.length - 1].actions = actions;
                break;
            case 'MAIN':
                this.children.push(new main(name, this, template));
                this.children[this.children.length - 1].actions = actions;
                break;
            default:
        }
        this.element.appendChild(this.children[this.children.length - 1].element);
    }

    #createElement() {
        //stub to be overwritten by extended classes.
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = [];
    }

    constructor(name) {
        this.implements = [];
        this.name = name;

    }
    print() {
        return {
            name: this.name,
            type: 'domObject',
            template: {
                id: this.id,
                cssClass: this.cssClass,
                text: this.text,
            },
            theme: this.theme,
            actions: this.actions,
            children: this.children,
        }
    }
}

class main extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('MAIN');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['border', 'text', 'background'];
    }

    print() {
        const output = super.print();
        output.type = 'MAIN';
        return output;
    }
}
class div extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('DIV');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['border', 'text', 'window'];
    }

    print() {
        const output = super.print();
        output.type = 'DIV';
        return output;
    }
}

class h1 extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('H1');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['text'];
    }

    print() {
        const output = super.print();
        output.type = 'H1';
        return output;
    }
}

class h2 extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('H2');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['text'];
    }

    print() {
        const output = super.print();
        output.type = 'H2';
        return output;
    }
}

class h3 extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('H3');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['text'];
    }

    print() {
        const output = super.print();
        output.type = 'H3';
        return output;
    }
}

class button extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('BUTTON');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['text', 'border', 'accent'];
    }

    print() {
        const output = super.print();
        output.type = 'BUTTON';
        return output;
    }
}

class ul extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('UL');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['text'];
    }

    print() {
        const output = super.print();
        output.type = 'UL';
        return output;
    }
}

class li extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('LI');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['text'];
    }

    print() {
        const output = super.print();
        output.type = 'LI';
        return output;
    }
}

class textBox extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('input[type=text]');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['text'];
    }

    print() {
        const output = super.print();
        output.type = 'textBox';
        return output;
    }
}

class textArea extends domObject {
    constructor(name, parent, template) {
        super(name);
        this.#createElement();
        this.#setImplements();
        this.inheritFromParent(parent);
        this.applyTemplate(template);
    }

    #createElement() {
        this.element = document.createElement('TEXTAREA');
    }

    #setImplements() {
        //which elements of the theme are we applying.
        this.implements = ['text'];
    }

    print() {
        const output = super.print();
        output.type = 'textArea';
        return output;
    }
}




/*******************END CLASSES ********************/


const defaultTheme = new theme();
const green = '#00FF00';
const black = '#000000';
const darkGrey = '#222222';
const lightGray = '#444444';
defaultTheme.newColor('text', green);
defaultTheme.newColor('background', black);
defaultTheme.newColor('window', lightGray);
defaultTheme.newColor('textBackground', black);
defaultTheme.newColor('border', green);
defaultTheme.newColor('accent', darkGrey);

function setMain(ourMain) {
    const titleTemp = {
        id: '#title-bar',
        text: 'Your Note Vault! (double click to change)',
    };
    const bodyTemp = {
        id: '#body',
    };

    const colorArr = ourMain.theme.theme;
    const bodyColor = new theme(colorArr);
    bodyColor.window = black;
    ourMain.createChild('titleBar', 'DIV', titleTemp);
    ourMain.createChild('body', 'DIV', bodyTemp);
    ourMain.children[1].theme.theme = bodyColor.theme;

}


const app = new main("notevault");
app.theme = defaultTheme;
app.id = '#background';

app.appendSelf(document.querySelector('body'));
setMain(app);
console.log(app);