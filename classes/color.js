export default class color {
    typeOf = 'Color';
    r = 0;
    g = 0;
    b = 0;
    a = undefined;
    /**
     * Takes in a string to store a color value
     * @param {String} c - A string in the format rgba(0,0,0,0) or rgb(0,0,0)
     */
    constructor(c) {
        if (c.includes("rgb")) {
            let t = c.substring(c.indexOf("(")).split("(")[1].split(")")[0].split(",");
            if (t.length === 3 || t.length === 4)
                this.r = parseInt(t[0]);
            this.g = parseInt(t[1]);
            this.b = parseInt(t[2]);
            if (t.length === 4) this.a = parseFloat(t[3]);

            if (this.r >= 0 && this.r <= 255 &&
                this.g >= 0 && this.g <= 255 &&
                this.b >= 0 && this.b <= 255 &&
                this.a >= 0 && this.a <= 1) {
                return this.value();
            }
            else { return false; }
        }
    }

    /**
     * Returns a string rgb/rgba value
     */
    value = () => {
        if (this.a) {
            return `rgba(${this.r},${this.g},${this.b},${this.a})`;
        }
        else
            return `rgb(${this.r},${this.g},${this.b})`;
    }

    /**
     * Returns a string of the inverse rgb/rgba value
     */
    inverse = () => {
        if (this.a) {
            return `rgba(${(this.r + 128) % 255},${(this.g + 128) % 255},${(this.b + 128) % 255},${1 - this.a})`;
        }
        else
            return `rgb(${(this.r + 128) % 255},${(this.g + 128) % 255},${(this.b + 128) % 255})`;
    }
}