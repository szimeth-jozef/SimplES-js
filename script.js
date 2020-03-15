const blueSquare = document.querySelector('.square');


const eventSystem = new SimpleES([{
    element: blueSquare,
    func: function () {
        console.log("Yo clicked on this blue motherfucker");    
    }
}]);



// const eventSystem = new SimpleES();

// eventSystem.attachEvent(blueSquare, function() {
//     console.log("Yo clicked on this blue motherfucker");
// });