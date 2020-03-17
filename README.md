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
