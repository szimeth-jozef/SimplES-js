const event_system = new SimplES();

const title = document.getElementById('redone');

event_system.ClickEvent.addEvent(title, () => console.log('Hey beauty, you clicked me!'));