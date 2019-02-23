/// <reference path="./Screeps-Typescript-Declarations-master/dist/screeps.d.ts"/>
var roleBuilder = {
    run: function (creep) {
        this.assignMemory(creep);

        if (creep.memory.working) {
            let target = Game.spawns.Spawn1.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            if (false) {
                var targets = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy <= structure.energyCapacity &&
                            structure.energy > 100;
                    }
                });
                if (targets.length > 0) {
                    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
            else {
                let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    },
    assignMemory: function (creep) {
        if (creep.memory.working === undefined) {
            creep.memory.working = false;
        }

        if (creep.carry.energy === creep.carryCapacity && creep.memory.working === false) {
            creep.memory.working = true;
        } else if (creep.carry.energy === 0 && creep.memory.working) {
            creep.memory.working = false;
        }
    }
}

module.exports = roleBuilder;