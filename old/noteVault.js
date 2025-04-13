import color from './classes/color.js';
import theme from './classes/theme.js';
import button from './classes/button.js';
import note from './classes/note.js';
import category from './classes/category.js';
import vault from './classes/vault.js';


/************** End Classes ****************** */




const green = new color("rgb(0,255,0)");
const black = new color("rgb(0,0,0)");
const darkGrey = new color("rgb(50,50,50)");
const defaultTheme = new theme(black, darkGrey, black, green, green, new color(green.inverse()));
const v = new vault(defaultTheme);


document.addEventListener('DOMContentLoaded', function () {
    init();
});

//window.addEventListener('resize', v.setSize, true);


function init() {
    document.querySelector("body").appendChild(v.element);
    v.setSize();

}





