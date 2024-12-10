import Entity from "../Entity.js"
import { AlteredState } from "../Data/AlteredState.js";

export const CardsEffects = {
    //Si hay algun this es referente a la clase desde la que se llame o el objeto mas cercano a la llamada.
    //Mejor no usar this, sino parametros que se le pasen a las funciones. Si un parametro no se va a usar se pone
    // _ en el lugar donde iria dicho parametro en los parentesis de la funcion

    //Para todos los efectos:
    //thisTeam --> equipo al que le ha tocado la carta
    //thatTeam --> equipo al que no le ha tocado la carta

    FoolEffect: (thisTeam, _)=> {
        
    },

    MagicianEffect: (thisTeam, thatTeam) => { 
        
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

    
    HermitEffect: (thisTeam, thatTeam) => {
        if(thisTeam.name == "Party"){
            //ATAQUE ESPECIAL??
        }
        else{
            thatTeam.getRandomCharacter().alteredState = AlteredState.no_attack;
        }
    },


    Wheel_of_FortuneEffect:(thisTeam, _) =>{
        let rand = getRandomInt(2); //Da un numero aleatorio entre 0 y 1
        let fortune;

        if(rand == 1) fortune = 1;
        else fortune = -1; 

        thisTeam.entities.forEach(e => {
            e.strength += fortune;
            e.luck += fortune;
            e.attack += fortune;
            e.defense += defense;

        });
    },


    JusticeEffect: (thisTeam, thatTeam) => {
        //Esta carta tiene unos efectos diferentes según cual sea el equipo receptor
        //Carta obtenida por el team de la party
        if(thisTeam.name == "Party"){
            thisTeam.entities.forEach(e => {
                e.strength += 2;
                e.luck += 2;
                e.attack += 2;
                e.defense += 2;
    
            });
        }
        //Carta obtenida por los enemigos
        else{
            let enemy = thisTeam.getRandomCharacter();
            let character = thatTeam.getRandomCharacter();

            enemy.health = character.health;
            enemy.luck = character.luck;
            enemy.attack = character.attack;
            enemy.defense = character.defense;
        }
    },
    
    Hanged_ManEffect: (thisTeam, _) => {
        thisTeam.entities.getRandomCharacter().health = 1;
    },

    DeathEffect: (thisTeam, _) => {
        thisTeam.entities.getRandomCharacter().Die();
    },
    
    TemperanceEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.health+=5;
        });
    },

    DevilEffect: (thisTeam, _) => {
        let first = thisTeam.entities.getRandomCharacter();
        first.health +=2;
        first.defense += 2;
        first.attack += 2;
        first.luck += 2;

        let second = thisTeam.entities.getRandomCharacterExcept(first);
        second.health -=2;
        second.defense -= 2;
        second.attack -= 2;
        second.luck -= 2;
    },

    TowerEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.defense += 2;
        });
    },

    StarEffect: (thisTeam, _) => {
        let star = thisTeam.getRandomCharacter();
        star.health +=5;
        star.defense += 5;
        star.attack += 5;
        star.luck += 5;
    },
    
    MoonEffect: (thisTeam, _) => {
        thisTeam.getRandomCharacter().alteredState = AlteredState.sleep;
    },
    
    SunEffect: (thisTeam, _) => {
        
    },
    
    JudgementEffect: (thisTeam, thatTeam) => {
        
    },
    
    WorldEffect: (thisTeam, _) => {
        thisTeam.getRandomCharacter().alteredState = AlteredState.deaf;
    }
}