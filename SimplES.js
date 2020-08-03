class SimplES {
    constructor() {
        if (SimplES.instance instanceof SimplES) {
            return SimplES.instance;
        }

        // Event handler modules
        this.ClickEvent = new ClickEventsHandler();
        this.KeypressEvent = new KeypressEventsHandler();

        Object.freeze(this);
        SimplES.instance = this;
    }

    static createXPathFromElement(element) {
        const allNodes = document.getElementsByTagName('*');
        let segs;
        for (segs = []; element && element.nodeType == 1; element = element.parentNode) {
            if (element.hasAttribute('id')) {
                let uniqueIdCount = 0;
                for (let n = 0; n < allNodes.length; n++) {
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == element.id) uniqueIdCount++;
                    if (uniqueIdCount > 1) break;
                }
                if (uniqueIdCount == 1) {
                    segs.unshift(`id("${element.getAttribute('id')}")`);
                    return segs.join('/');
                } else {
                    segs.unshift(`${element.localName.toLowerCase()}[@id="${element.getAttribute('id')}"]`);
                }
            }
            else if (element.hasAttribute('class')) {
                segs.unshift(`${element.localName.toLowerCase()}[@class="${element.getAttribute('class')}"]`);
            } else {
                let i, sib;
                for (i = 1, sib = element.previousSibling; sib; sib = sib.previousSibling) {
                    if (sib.localName == element.localName) i++;
                }
                segs.unshift(`${element.localName.toLowerCase()}[${i}]`);
            }
        }
        return segs.length ? '/' + segs.join('/') : null;
    }

    static isFunction(func) {
        return func && {}.toString.call(func) === '[object Function]';
    }

    static isElement(element) {
        return (
            typeof HTMLElement === "object" ? element instanceof HTMLElement : element &&
            typeof element === "object" && element !== null && element.nodeType === 1 && typeof element.nodeName === "string"
        );
    }
}


class ClickEventsHandler {
    constructor() {
        // when possible change this.events and this.EMPTY_CLICK to private properties
        this.events = {};
        this.EMPTY_CLICK = null;
        this.listen();
    }

    addEvent(element, func) {
        if (!SimplES.isElement(element) && SimplES.isFunction(func)) {
            throw `[Error]: An event can be created only with a pair of an element and a function, not a pair of ${typeof element} and ${typeof func}.`;
        } else {
            const XPath = SimplES.createXPathFromElement(element);
            if (XPath in this.events) {
                console.warn('Event you are attempting to create already exists.');
                console.warn('Event with this element', element);
                return;
            }
    
            this.events[XPath] = new ClickEvent(element, func);
            // TODO: considering to return the event
            // return this.events[XPath];
        }
    }

    addEmptyClick(func) {
        if (SimplES.isFunction(func)) {
            this.EMPTY_CLICK = func;
        }
        else {
            throw `[Error]: Empty click event must be a funtion, not ${typeof func}!`;
        }
    }

    listen() {
        const self = this;
        document.addEventListener('click', function(event) {
            const target = event.target;
            const XPath = SimplES.createXPathFromElement(target);

            if (XPath in self.events) {
                self.events[XPath].triggerFunction();
            }
            else if (self.EMPTY_CLICK) {
                self.EMPTY_CLICK();
            } 
            else {
                console.warn('Empty click event has not been set!');
                console.warn('You can add one with .ClickEvent.addEmptyClick() method.');
            }
        });
    }
}


class KeypressEventsHandler {
    constructor() {
        this.events = [];
    }
}


class Event {
    constructor(func) {
        this.triggerFunction = func; 
    }
}


class ClickEvent extends Event {
    constructor(element, func) {
        super(func);
        this.targetElement = element;
    }
}


class KeypressEvent extends Event {
    constructor() {}
}