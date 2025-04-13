export default class theme {
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

        this.#colors.splice(removeIdx, 1);

        return true;
    }

    /**
     * Returns a copy of the colors array
     */
    get theme() {
        return this.#colors.slice();
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
        colorObjArr.forEach(function (colorObj) {
            this.newColor(colorObj.property, colorObj.color);
        });
    }
}