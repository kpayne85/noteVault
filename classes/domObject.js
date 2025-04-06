export function domObjectFactory(elementType) {
    const obj = {
        elementType: elementType,

    };

    return obj;
}

export default class domObject {
    element;

    constructor(element) {
        this.element = element;
    }


}