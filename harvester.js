/// <reference path="./Screeps-Typescript-Declarations-master/dist/screeps.d.ts"/>
var roleHarvester = {
    run: function (creep, node) {
        memoryManagement(creep);

        if (creep.memory.working) {
            let target = Game.spawns.Spawn1.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            var targets = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}

/**
 * Manages the memory of the given creep for the Harvester job.
 * @param {Creep} creep - the creep wanting to be managed.
 */
function memoryManagement(creep) {
    if (creep.memory.working === undefined) {
        creep.memory.working = true;
    }

    if (creep.carry.energy === creep.carryCapacity && creep.memory.working) {
        creep.memory.working = false;
        creep.memory.target = undefined;
    } else if (creep.carry.energy === 0 && creep.memory.working === false) {
        creep.memory.working = true;
    }
}

module.exports = roleHarvester;