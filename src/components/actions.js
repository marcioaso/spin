import { gemTypes } from "./enum"
import {player, setPlayer, enemy, setEnemy} from "./store"

export const lock = (index) => {
    const char = player()
    const oldSpin = char.spin
    const newList = oldSpin.list.map((each,i) => {
        if (i !== index) return each;
        return {
            ...each,
            locked: !each.locked
        }
    })
    const newSpin = {
        ...oldSpin,
        list: newList
    }
    setPlayer({
        ...char,
        spin: newSpin
    })
}

export const spinPlayer = () => {
    const char = player()
    const newSpin = spin(char)
    console.log(newSpin)

    setPlayer({
        ...char,
        spin: newSpin
    })

    if(newSpin.count === 3) {
        spinEnemy()
    }
}

const spinEnemy = () => {
    const char = enemy()
    const newSpin = spin(char)

    setEnemy({
        ...char,
        spin: newSpin
    })

    battle()
}

const spin = (char) => {
    const oldList = char.spin.list
    const newList = oldList.map(each => {
        if(each.locked) return each
        const random = Math.floor(Math.random()*(gemTypes.length))
        return {
            gem:gemTypes[random],
            locked: false
        }
    })

    return {
        count: char.spin.count+1,
        list: newList
    }
}

const battle = () => {
    upgrade(player)
}
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))
const upgrade = (state) => {
    const char = state()
    const newChar = {
        left: deepCopy(char.left),
        right: deepCopy(char.right),
        wall: char.wall
    }
    char.spin.list.forEach(each => {
        const {name,upgrades} = each.gem;
        if(name=="wall") {
            newChar.wall++
        } else if(name != "none") {
            newChar[name].turn++;
            if(upgrades) newChar[name].xp++
        }
    })
    console.log(newChar)
}