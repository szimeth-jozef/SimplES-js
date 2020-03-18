# SimplES-js
Simple javascript event system for basic interactions with DOM elements

## How to use it?
The whole event system has one main instance of `SimplES` class. We are able to attach as many events to this
instance as we want. We can add them at the instantiating:
```javascript
const blueSquare = document.querySelector('.blue-square');
const redSquare  = document.querySelector('.red-square'); 

const eventSystem = new SimplES([
    {
        element: blueSquare,
        onEvent: function () {
            console.log("Clicked on blue square");    
        }
    },
    {
        element: redSquare,
        onEvent: function () {
            console.log("Clicked on red square");    
        }
    }
]);
```
And also whenever after instantiating with methods. One of them is `attachEvent` which simply adds one 
so called event_pair, which is an object with two properties, `element` and `onEvent` (these properties must be named like this).
```javascript
const blueSquare = document.querySelector('.blue-square');
const redSquare  = document.querySelector('.red-square'); 

const eventSystem = new SimplES();

eventSystem.attachEvent(blueSquare, () => console.log("Clicked on blue square"));
eventSystem.attachEvent(redSquare, () => console.log("Clicked on red square"));
```

Another way to add events is adding the same function to multiple elements. This can be accomplished with the
`attachWithSameFunction` method.
```javascript
const buttons = document.getElementsByClassName('buttons');

const eventSystem = new SimplES();

eventSystem.attachWithSameFunction(buttons, () => console.log("Clicked on one of these blue buttons!"));
```

We can trigger an event when the target of a click is not in the registred events with `addEmptyClick`. Keep in mind that every call of this method with valid input will override the previous event. When is this useful? For example when the web page has multiple buttons like posts on social network. They have options button which opens a little dialog box, but we want to also close them when the user clicks to another button or when he/she clicks away and then we can use this method.
```javascript
eventSystem.addEmptyClick(() => console.log("Here is nothing to click on!"));
```


**P.S.: Feel free to expand this tiny library :D**
