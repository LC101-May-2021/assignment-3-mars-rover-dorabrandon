const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

 it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect (rover.position).toEqual (98382);
    expect(rover.mode).toEqual('NORMAL');
    expect (rover.generatorWatts).toEqual(110);
  });

  it ("response returned by receiveMessage contains name of message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let rover = new Rover(98382); 
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
   expect(response.message).toEqual('Test message with two commands');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let rover = new Rover(98382); 
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual ('true');
  });

  it("responds correctly to status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let rover = new Rover(98382); 
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect (rover.receiveMessage(message).results).toEqual ([{completed: "true", roverStatus:{position: 98382, mode:'NORMAL', generatorWatts: 110}}])

  });

  it("responds correctly to mode change command",function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK')];
    let rover = new Rover(98382); 
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect (rover.receiveMessage(message).results).toEqual ([{completed: 'false'},{completed: "true", roverStatus:{position: 98382, mode:'LOW_POWER', generatorWatts: 110}}])
    let commands2 = [new Command('MODE_CHANGE', 'NORMAL'),new Command('STATUS_CHECK')];
    let rover2 = new Rover(98382); 
    let message2 = new Message('Test message with two commands', commands2);
    let response2 = rover2.receiveMessage(message2);
    expect (rover.receiveMessage(message2).results).toEqual ([{completed: 'true'},{completed: "true", roverStatus:{position: 98382, mode:'NORMAL', generatorWatts: 110}}])
  });

  it ("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE',99999), new Command('STATUS_CHECK')];
    let rover = new Rover(98382); 
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(rover.receiveMessage(message).results).toEqual([{completed: 'false'},{completed: 'false'},{completed: "true", roverStatus:{position: 98382, mode:'LOW_POWER', generatorWatts: 110}}])
  });

  it("responds with position for move command", function(){
let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE',99999), new Command('STATUS_CHECK')];
    let rover = new Rover(98382); 
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(rover.receiveMessage(message).results).toEqual([{completed: 'true'},{completed: 'true'},{completed: "true", roverStatus:{position: 99999, mode:'NORMAL', generatorWatts: 110}}])
  });
});
