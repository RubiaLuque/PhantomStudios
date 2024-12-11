import { Type } from "./Type.js"
export const MainTeam =
{
    entities :
    [
        {
            name: "Javi",
            damage: 20,
            health: 80,
            type: Type.horny,
            defense: 10,
            xp: 0,
            level: 1,
            maxLevel: 5,
            luck: 0.5,
            image: "Javi",
            damageSound: "oioioi",
        },

        {
            name: "Fueyo",
            damage: 10,
            health: 120,
            type: Type.wrath,
            defense: 10,
            xp: 0,
            level: 1,
            maxLevel: 5,
            luck: 0.5,
            image: "Fueyo",
            damageSound: "oioioi",
        },

        {
            name: "Mika",
            damage: 5,
            health: 200,
            type: Type.depression,
            defense: 10,
            xp: 0,
            level: 1,
            maxLevel: 5,
            luck: 0.5,
            image: "Mika",
            damageSound: "oioioi",
        },

        {
            name: "Muxu",
            damage: 10,
            health: 90,
            type: Type.anxiety,
            defense: 10,
            xp: 0,
            level: 1,
            maxLevel: 5,
            luck: 0.75,
            image: "Muxu",
            damageSound: "oioioi",
        }
    ],

    enemies:
    {
        Uroboros: {
            name: "Uroboros",
            damage: 30,
            health: 70,
            type: Type.horny,
            luck: 0.5,
            xp: 15,
            image: "Uroboros",
            damageSound: "oioioi",
        },

        Demon: {
            name: "Demon",
            damage: 20,
            health: 90,
            type: Type.wrath,
            luck: 0.5,
            xp: 15,
            image: "Demon",
            damageSound: "oioioi",
        },

        Skibidi: {
            name: "Skibidi",
            damage: 10,
            health: 50,
            type: Type.depression,
            luck: 0.5,
            xp: 10,
            image: "Skibidi",
            damageSound: "oioioi",
        },

        Fork: {
            name: "Fork",
            damage: 5,
            health: 30,
            type: Type.anxiety,
            luck: 0.5,
            xp: 5,
            image: "Fork",
            damageSound: "oioioi",
        }
    }
}