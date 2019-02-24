/// <reference path="./Screeps-Typescript-Declarations-master/dist/screeps.d.ts"/>
var roleRepairer = {
    run: function(creep) {
        this.manageMemory(creep);

        if (creep.memory.working) { 
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
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
    },
    manageMemory: function(creep) {
        if (creep.memory.working == undefined) {
            creep.memory.working = false;
        }

        if (creep.carry.energy == creep.carryCapacity && !creep.memory.working) {
            creep.memory.working = true;
        }
        else if (creep.carry.energy == 0 && creep.memory.working) {
            creep.memory.working = false;
        } 
    }
};

module.exports = roleRepairer;