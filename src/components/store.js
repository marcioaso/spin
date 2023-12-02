import { createSignal } from "solid-js";
import { warriorTypes, colorTypes, gemTypes } from "./enum";

const initialPlayer = {
    life: 10,
    wall: 0,
    left: {
        type: warriorTypes[1],
        turn: 0,
        level: 0,
        xp: 0
    },
    right: {
        type: warriorTypes[4],
        turn: 0,
        level: 0,
        xp: 0
    },
    spin:{
        count:0,
        list:[
            { 
                gem: gemTypes[0],
                locked: false
            },
            { 
                gem: gemTypes[0],
                locked: false
            },
            { 
                gem: gemTypes[0],
                locked: false
            },
            { 
                gem: gemTypes[0],
                locked: false
            },
            { 
                gem: gemTypes[0],
                locked: false
            }
        ]
    }
}

export const [player, setPlayer] = createSignal({...initialPlayer});
export const [enemy, setEnemy] = createSignal({...initialPlayer});

export const reset = () => {
    setPlayer({...initialPlayer})
    setPlayer({...initialPlayer})
}