/// <reference path="./Screeps-Typescript-Declarations-master/dist/screeps.d.ts"/>
var maxCreeps = 10;


var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var roleBuilder = require('builder');

var creepFactory = require('creepfactory');

module.exports.loop = function() {
    let creepAmount = 0;

    creepFactory.runCleanup();

    // Loop over all creeps alive
    for (let name in Game.creeps) {
        creepAmount++;
        // Get the object by it's name.
        let creep = Game.creeps[name];
        // If it doesn't have a job, assign the harvest job.
        if (creep.memory.job == undefined) {
            console.log(creep + " got the job harvester");
            creep.memory.job = "harvester";
        }

        // If the job is harvester and we don't have max amount of harvesters
        if (creep.memory.job == "harvester"){
            roleHarvester.run(creep);
        }
        // Else upgrade the controller.
        else if(creep.memory.job == "upgrader") {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.job == "builder") {
            roleBuilder.run(creep);
        }
    }

    // If we don't have the max amount of creeps, spawn one.
    if (creepAmount < maxCreeps) {
        spawnCreep();
    }
}

function spawnCreep() {
    if(Game.spawns.Spawn1.createCreep([MOVE, CARRY, WORK]) >= 0){
            console.log("Spawning creep");
    }
}
