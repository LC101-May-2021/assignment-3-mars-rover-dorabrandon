class Rover {
  constructor (position){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message){
    let msg = message.name;
    let res = [];

  for (let i = 0; i<message.commands.length; i++) {
      if (message.commands[i].commandType ==='MODE_CHANGE'){
        this.mode = message.commands[i].value
          if (this.mode ==='LOW_POWER'){
            res.push ({completed: "false"})
         } else if (this.mode ==='NORMAL'){
            res.push ({completed: "true"})
      }
    }
      if (message.commands[i].commandType ==='MOVE'){
        if (this.mode ==='NORMAL'){
          this.position = message.commands[i].value;
          res.push ({completed: "true"})
        }else if (this.mode ==='LOW_POWER'){
          res.push ({completed: "false"})
        }
      } else
     if (message.commands[i].commandType === 'STATUS_CHECK'){
       let roverStatus = {position: this.position, mode: this.mode, generatorWatts: this.generatorWatts}
      res.push ({completed: "true", roverStatus: roverStatus})
     //       console.log (res[2].roverStatus)
      
    }

  }

      return {
      message : msg,
      results : res
    }
}
}
module.exports = Rover;

