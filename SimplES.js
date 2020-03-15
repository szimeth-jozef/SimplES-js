/**
 * @class Main event handler creates an event listener on the whole document, which after that 
 * listens to all of the clicks and compares to the given structures of an element and a function attached to it
 * @constructor Accepts an array of element, function structures see param
 * @param {Array<object>} rawPairs Array of objects, which contains an element and a function [{element:x, func:y},]
 */
class SimpleES {
    constructor(rawPairs=null) {
        this.events = [];
        
        if (rawPairs) {
            this.attachFromConstructor(rawPairs);
        }

        this.listen();
    }

    /**
     * @description Attaches to multiple elements the same function
     * @param {Array<HTMLElement>} elements An array of HTMLElements
     * @param {function} func Function attached to the element
     * @returns An array of event objects for a possible later use
     */
    attachWitchSameFunction(elements, func) {
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
            const event = new Event(pair.element, pair.func);
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