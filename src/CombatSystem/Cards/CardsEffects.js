import Entity from "../Entity.js"
import { AlteredState } from "../Data/AlteredState.js";

export const CardsEffects = {
    //Si hay algun this es referente a la clase desde la que se llame o el objeto mas cercano a la llamada.
    //Mejor no usar this, sino parametros que se le pasen a las funciones. Si un parametro no se va a usar se pone
    // _ en el lugar donde iria dicho parametro en los parentesis de la funcion

    //Para todos los efectos:
    //Team1 --> party
    //Team2 --> Enemigos

    FoolEffect: (thisTeam, _)=> {
        
    },

    MagicianEffect: (thisTeam, _) => { 
        
    },

    High_PriestessEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.luck+=2;
        });   
    },

    EmperorEffect: (thisTeam, _) => {
        thisTeam.getRandomCharacter().alteredState = AlteredState.papeado;
    },

    EmpressEffect: (thisTeam, _) => {
        thisTeam.getRandomCharacter().alteredState = AlteredState.fear;
    },

    HierophantEffect: (thisTeam, _) => {

    },

    LoversEffect: (thisTeam, thatTeam) => {

    },
    
    ChariotEffect: (thisTeam, _) => {

    },

    StrengthEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.strength+=3;
        });
    },

    
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