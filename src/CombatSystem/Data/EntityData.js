import { Type } from "./Type.js"
export const EntityData =
{
    entities :
    [
        {
            name: "JaviN",
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
            name: "FueyoN",
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
            name: "MikaN",
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
            name: "MuxuN",
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
        Corchea: {
            name: "Corchea",
            damage: 30,
            health: 70,
            type: Type.horny,
            luck: 0.5,
            xp: 15,
            image: "Corchea",
            damageSound: "oioioi",
        },

        Corcheas: {
            name: "Corcheas",
            damage: 20,
            health: 90,
            type: Type.wrath,
            luck: 0.5,
            xp: 15,
            image: "Corcheas",
            damageSound: "oioioi",
        },

        Semicorchea: {
            name: "Semicorchea",
            damage: 10,
            health: 50,
            type: Type.depression,
            luck: 0.5,
            xp: 10,
            image: "Semicorchea",
            damageSound: "oioioi",
        },

        Redonda: {
            name: "Redonda",
            damage: 5,
            health: 30,
            type: Type.anxiety,
            luck: 0.5,
            xp: 5,
            image: "Redonda",
            damageSound: "oioioi",
        },
        Jaime:{
            name: 'Jaime',
            damage: 20,
            health: 500,
            type: Type.depression,
            luck: 0.75,
            xp: 70,
            image: 'NPC',
            damageSound: 'oioioi'

        }
    }
}