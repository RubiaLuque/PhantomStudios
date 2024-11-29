import TarotCard from "./TarotCard.js";
import { CardsEffects } from "./CardsEffects.js"; //Fichero con funciones genericas

const Type = {
    Fool: { function: CardsEffects.FoolEffect, texture: "Fool" },
    Magician: { function: CardsEffects.MagicianEffect, texture: "Magician" }
    // High_Priestess =
    // Empress =
    // Emperor =
    // Hierophant =
    // Lovers =
    // Chariot = 
    // Strength =
    // Hermit = 
    // Wheel_of_Fortune = 
    // Justice =
    // Hanged_Man =
    // Death =
    // Temperance =
    // Devil =
    // Tower =
    // Star =
    // Moon = 
    // Sun = 
    // Judgement =
    // World = 
}

//Esta clase elige una carta al azar y le asocia su efecto
export default class RandomCardSelector {
    constructor() { 
        this.vector = ["Fool", "Magician"];
    }

    RandomElection() {
        let rand = this.vector[Math.floor(Math.random() * (this.vector.length))];
        return Type[rand];
    }


}