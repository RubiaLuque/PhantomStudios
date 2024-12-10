import TarotCard from "./TarotCard.js";
import { CardsEffects } from "./CardsEffects.js"; //Fichero con funciones genericas

const Type = {
    Fool: { function: CardsEffects.FoolEffect, texture: "Fool" },
    Magician: { function: CardsEffects.MagicianEffect, texture: "Magician" },
    High_Priestess: { function: CardsEffects.High_PriestessEffect, texture: "High_Priestess" },
    Empress: { function: CardsEffects.EmpressEffect, texture: "Empress" },
    Emperor: { function: CardsEffects.EmperorEffect, texture: "Emperor" },
    Hierophant: { function: CardsEffects.HierophantEffect, texture: "Hierophant" },
    Lovers: { function: CardsEffects.LoversEffect, texture: "Lovers" },
    Chariot: { function: CardsEffects.ChariotEffect, texture: "Chariot" },
    Strength: { function: CardsEffects.StrengthEffect, texture: "Strength" },
    Hermit: { function: CardsEffects.HermitEffect, texture: "Hermit" },
    Wheel_of_Fortune: { function: CardsEffects.Wheel_of_FortuneEffect, texture: "Wheel_of_Fortune" },
    Justice: { function: CardsEffects.JusticeEffect, texture: "Justice" },
    Hanged_Man: { function: CardsEffects.Hanged_ManEffect, texture: "Hanged_Man" },
    Death: { function: CardsEffects.DeathEffect, texture: "Death" },
    Temperance: { function: CardsEffects.TemperanceEffect, texture: "Temperance" },
    Devil: { function: CardsEffects.DevilEffect, texture: "Devil" },
    Tower: { function: CardsEffects.TowerEffect, texture: "Tower" },
    Star: { function: CardsEffects.StarEffect, texture: "Star" },
    Moon: { function: CardsEffects.MoonEffect, texture: "Moon" },
    Sun: { function: CardsEffects.SunEffect, texture: "Sun" },
    Judgement: { function: CardsEffects.JudgementEffect, texture: "Judgement" },
    World: { function: CardsEffects.WorldEffect, texture: "World" }
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
        console.log(Type[rand]);
        return Type[rand];
    }


}