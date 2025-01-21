import { CardsEffects } from "./CardsEffects.js"; //Fichero con funciones genericas
import { cardsInfo } from "./CardsInfo.js";

const Type = {
    Fool: { function: CardsEffects.FoolEffect, texture: "Fool", info: cardsInfo.FoolInfo },
    Magician: { function: CardsEffects.MagicianEffect, texture: "Magician", info: cardsInfo.MagicianInfo },
    High_Priestess: { function: CardsEffects.HighPriestessEffect, texture: "High_Priestess", info: cardsInfo.HighPriestessInfo },
    Empress: { function: CardsEffects.EmpressEffect, texture: "Empress", info: cardsInfo.EmpressInfo },
    Emperor: { function: CardsEffects.EmperorEffect, texture: "Emperor", info: cardsInfo.EmperorInfo },
    Hierophant: { function: CardsEffects.HierophantEffect, texture: "Hierophant", info: cardsInfo.HierophantInfo },
    Lovers: { function: CardsEffects.LoversEffect, texture: "Lovers", info: cardsInfo.LoversInfo },
    Chariot: { function: CardsEffects.ChariotEffect, texture: "Chariot", info: cardsInfo.ChariotInfo },
    Strength: { function: CardsEffects.StrengthEffect, texture: "Strength", info: cardsInfo.StrengthInfo },
    Hermit: { function: CardsEffects.HermitEffect, texture: "Hermit", info: cardsInfo.HermitInfo },
    Wheel_of_Fortune: { function: CardsEffects.WheelOfFortuneEffect, texture: "Wheel_of_Fortune", info: cardsInfo.WheelOfFortuneInfo },
    Justice: { function: CardsEffects.JusticeEffect, texture: "Justice", info: cardsInfo.JusticeInfo },
    Hanged_Man: { function: CardsEffects.HangedManEffect, texture: "Hanged_Man", info: cardsInfo.HangedManInfo },
    Death: { function: CardsEffects.DeathEffect, texture: "Death", info: cardsInfo.DeathInfo },
    Temperance: { function: CardsEffects.TemperanceEffect, texture: "Temperance", info: cardsInfo.TemperanceInfo },
    Devil: { function: CardsEffects.DevilEffect, texture: "Devil", info: cardsInfo.DevilInfo },
    Tower: { function: CardsEffects.TowerEffect, texture: "Tower", info: cardsInfo.TowerInfo },
    Star: { function: CardsEffects.StarEffect, texture: "Star", info: cardsInfo.StarInfo },
    Moon: { function: CardsEffects.MoonEffect, texture: "Moon", info: cardsInfo.MoonInfo },
    Sun: { function: CardsEffects.SunEffect, texture: "Sun", info: cardsInfo.SunInfo },
    Judgement: { function: CardsEffects.JudgementEffect, texture: "Judgement", info: cardsInfo.JudgementInfo },
    World: { function: CardsEffects.WorldEffect, texture: "World", info: cardsInfo.WorldInfo }
}

//Esta clase elige una carta al azar y le asocia su efecto
export default class RandomCardSelector {
    constructor() { 
        this.vector = ["Fool", "Magician", "High_Priestess", "Empress", "Emperor", "Hierophant", "Lovers", "Chariot", "Strength", "Hermit",
            "Wheel_of_Fortune", "Justice", "Hanged_Man", "Death", "Temperance", "Devil", "Tower", "Star", "Moon", "Sun", "Judgement", "World"
        ];
    }

    RandomElection() {
        let rand = this.vector[Math.floor(Math.random() * (this.vector.length))];
        return Type[rand];
    }


}