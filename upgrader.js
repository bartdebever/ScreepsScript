/// <reference path="./Screeps-Typescript-Declarations-master/dist/screeps.d.ts"/>
var roleUpgrader = {
    run: function (creep) {
        if (creep.memory.working == undefined) {
            creep.memory.working = true;
        }

        if (creep.carry.energy == creep.carryCapacity && creep.memory.working) {
            creep.memory.working = false;
        }
        else if (creep.carry.energy == 0 && !creep.memory.working) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            var targets = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            var targets = Game.spawns.Spawn1.room.controller;
            let result = creep.upgradeController(targets);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}

module.exports = roleUpgrader;