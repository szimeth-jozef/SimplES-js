/**
 * @class SimplES constructor creates an event listener on the whole document, which after that 
 * listens to all of the clicks and compares them to the given structures of elements and functions attached
 * @constructor Accepts structures array of elements and functions see param
 * @param {Array<object>} rawPairs Array of objects, which contains an element and a function [{element:x, onEvent:y},]
 */
class SimplES {
    constructor(rawPairs=null) {
        this.events = [];
        
        if (rawPairs) this.attachFromConstructor(rawPairs);

        this.listen();
    }

    /**
     * @description Attaches to multiple elements the same function
     * @param {Array<HTMLElement>} elements An array of HTMLElements
     * @param {function} func Function attached to the element
     * @returns An array of event objects for a possible later use
     */
    attachWithSameFunction(elements, func) {
        const eventContainer = [];
        for (const element of elements) {
            const event = new Event(element, func);
            this.events.push(event);
            eventContainer.push(event);
        }
        return eventContainer;
    }

    /**
     * @description Attaches a single event to an elemet with corespondig function
     * @param {HTMLElement} element Tracked HTMLElement
     * @param {function} func Function attached to the element
     * @returns The event object for a possible later use
     */
    attachEvent(element, func) {
        const event = new Event(element, func);
        this.events.push(event);
        return event;
    }

    /**
     * @description Attaches given events at the object creation
     * @param {Array} rawPairs Array of objects, which contains an element and a function
     */
    attachFromConstructor(rawPairs) {
        for (const pair of rawPairs) {
            if (!('element' in pair && 'onEvent' in pair)) {
                console.error("You must specify an element key and an onEvent key in the object!");
                return;
            } 
            const event = new Event(pair.element, pair.onEvent);
            this.events.push(event);
        }
    }

    /**
     * @description Creates an event listener on the document and it maches the events. It does not
     * need a call externaly, it's called from the contructor
     */
    listen() {
        const self = this;
        document.addEventListener('click', function(event) {
            const target = event.target;
            for (const event of self.events) {
                event.match(target);
            }
        });
    }
}

class Event {
    constructor(elem, func) {
        this.trackedElement = elem;
        this.eventFunction = func;
    }

    match(target) {
        if (target === this.trackedElement) {
            this.eventFunction();
        }
    }
}


// TODO: use these functions to test input parameter of methods

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function isElement(o) {
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}