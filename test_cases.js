// Test cases

/*
-----------------------------------------------------------
    Test case 1
    -testing event attachment from constructor
    -testing attachEvent method
*/
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

// const blueSquare = document.querySelector('.blue-square');
// const redSquare  = document.querySelector('.red-square'); 

// const eventSystem = new SimplES();

// eventSystem.attachEvent(blueSquare, () => console.log("Clicked on blue square"));
// eventSystem.attachEvent(redSquare, () => console.log("Clicked on red square"));


/*
-----------------------------------------------------------
    Test case 2
    -testing attachWithSameFunction method
    -testing addEmptyClick method
*/
const buttons = document.getElementsByClassName('button');

eventSystem.attachWithSameFunction(buttons, () => console.log("Clicked on one of these blue buttons!"));

eventSystem.addEmptyClick(() => console.log("Where are you clicking there is nothing!"));
// eventSystem.addEmptyClick(23);


