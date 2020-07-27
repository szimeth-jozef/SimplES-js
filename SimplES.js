class SimplES {
    constructor() {
        if (SimplES.instance instanceof SimplES) {
            return SimplES.instance;
        }

        this.ClickEvent = new ClickEventsHandler();
        this.KeypressEvent = new KeypressEventsHandler();

        Object.freeze(this);
        SimplES.instance = this;
    }
}


class ClickEventsHandler {
    constructor() {
        this.events = [];
        this.EMPTY_CLICK = null;
        this.listen();
    }

    addEvent(element, func) {
        const clickEvent = new ClickEvent(element, func);
        this.events.push(clickEvent);
        // return clickEvent;
    }

    listen() {
        const self = this;
        document.addEventListener('click', function(event) {
            const target = event.target;
            let isTargetInEvents = false;

            for (const clickEvent of self.events) {
                const found = clickEvent.matchAndTrigger(target);
                if (found) isTargetInEvents = true;
            }

            if (!isTargetInEvents && self.EMPTY_CLICK) {
                self.EMPTY_CLICK();
            }
            else if (!isTargetInEvents) {
                console.warn('Empty click event has not been set!');
                console.warn('You can add one with addEmptyClick() method.');
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

    matchAndTrigger(target) {
        if (target === this.targetElement) {
            this.triggerFunction();
            return true;
        }
        return false;
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

