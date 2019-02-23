/// <reference path="./Screeps-Typescript-Declarations-master/dist/screeps.d.ts"/>
var creepFactory = {
  maxHarvesters: 6,
  maxUpgraders: 2,
  maxBuilder: 2,

  harvesters: 0,
  builders: 0,
  upgraders: 0,

  /**
   * Cleans up old Memory from dead Creeps to go down on the size.
   * Also counts the amount of active Creeps within a job.
   */
  runCleanup: function () {
    this.resetMemory();
    for (let creep in Memory.creeps) {
      // If the creep is in memory but not in the game, delete it.
      if (!Game.creeps[creep]) {
        delete Memory.creeps[creep];
        console.log(`Memory deleted for: ${creep}`);
      } else {
        // The creep is alive and we can check it's job and add it to the total in that job.
        let job = Memory.creeps[creep].job;
        if (job === undefined) {
          continue;
        }
        switch (job) {
          case "harvester":
            if (this.harvesters >= this.maxHarvesters) {
              Memory.creeps[creep].job = "upgrader";
              break;
            }

            this.harvesters++
            break;
          case "upgrader":
            if (this.upgraders >= this.maxUpgraders) {
              Memory.creeps[creep].job = "builder";
              break;
            }

            this.upgraders++;
            break;
          case "builder":
            this.builders++;
            break;
        }
      }
    }
  },
  manageRoles: function () {

  },
  resetMemory: function () {
    this.harvesters = 0;
    this.upgraders = 0;
    this.builders = 0;
  }
}

module.exports = creepFactory;