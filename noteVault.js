/**
 * 
 * @param {{
 * type: String,
 * text: String,
 * id: String,
 * classList: String,
 * actions: [{event: String, func: function, target: HTMLElement}],
 * appTarget: HTMLElement,
 * appRelation: String,
 * styles: [{prop: String, val: String}],}} propObj 
 * @returns 
 */
function make({ type, text, id, classList, appTarget, appRelation, actions, styles }) {

    //type, text, append, actions
    if (type) {
        const ele = document.createElement(type);
        if (text) ele.innerText = text;
        if (actions) {
            actions.forEach((a) => {
                ele.addEventListener(a.event, function (e) {
                    if (e.target === ele && e.type === a.event) {
                        a.func(e, a.target);
                    }
                });
            })
        }
        if (id) ele.id = id;
        if (classList) ele.classList = classList;
        if (styles) {
            styles.forEach((style) => {
                ele.style[style.prop] = style.val;
            });
        }

        if (appTarget) {
            switch (appRelation) {
                case 'last child':
                    appTarget.appendChild(ele);
                    break;
                default:
            }
        }
        return ele;
    }
}

function drawlayout() {
    const background = make({
        type: 'div',
        id: 'background',
        appTarget: document.querySelector('body'),
        appRelation: 'last child',
    });
    const headerSection = make({
        type: 'div',
        id: 'header-section',
        appTarget: background,
        appRelation: 'last child',
    });
    const header = make({
        type: 'h1',
        id: 'header',
        text: 'noteVault!',
        appTarget: headerSection,
        appRelation: 'last child',
    });
    const contentSection = make({
        type: 'div',
        id: 'content-section',
        appTarget: background,
        appRelation: 'last child',
    });
    const notesSection = make({
        type: 'div',
        id: 'notes-section',
        appTarget: contentSection,
        appRelation: 'last child',
    });
    const notesPreviewSection = make({
        type: 'div',
        id: 'notes-preview-section',
        appTarget: contentSection,
        appRelation: 'last child',
    });
}

function drawNotesSection() {
    const loc = document.querySelector("#notes-section");
    const addCat = function (loc, relation) {
        make({
            type: 'ul',
            text: "New Catagory",
            classList: 'catagory',
            appTarget: loc,
            appRelation: relation,
        });
        console.log(loc,);
    };
    const newCatBtn = make({
        type: 'button',
        id: 'new-cat',
        text: 'New Catagory',
        appTarget: loc,
        appRelation: 'last child',
        actions: [{ event: 'click', func: function () { addCat(loc, 'last child'); }, target: loc }],
    });
}

drawlayout();
drawNotesSection();