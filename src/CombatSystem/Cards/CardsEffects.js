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
        thisTeam.extraTurns++;
    },

    MagicianEffect: (thisTeam, thatTeam) => { 
        if(thisTeam.name == 'Party'){
            thisTeam.entities.forEach(element => {
                element.healing.bonus = -10;
            });
        }
        else{
            thatTeam.entities.forEach(element => {
                element.healing.able = false;
            });
        }
    },

    High_PriestessEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.luck.bonus = 2;
        });   
    },

    EmperorEffect: (thisTeam, _) => {
        thisTeam.GetRandomCharacter().ApplyAlteredState(AlteredState.papeado, 3)
    },

    EmpressEffect: (thisTeam, _) => {
        thisTeam.GetRandomCharacter().ApplyAlteredState(AlteredState.fear, 3)
    },

    HierophantEffect: (thisTeam, _) => {
       thisTeam.GetRandomCharacter().magicalImmunity = true; 
    },

    LoversEffect: (thisTeam, thatTeam) => {
        if(thisTeam.name == "Party"){
            let lover = thisTeam.GetRandomCharacter();
            let loved = thisTeam.GetRandomCharacterExcept(lover);

            loved.defense.bonus = lover.defense.quantity/2
            loved.damage.bonus = lover.damage.quantity/2
            loved.luck.bonus = lover.luck.quantity/2
            loved.health.bonus = lover.health.quantity/2
        }
        else{
            thatTeam.GetRandomCharacter().ApplyAlteredState(AlteredState.no_attack, 3)
        }
    },
    
    ChariotEffect: (thisTeam, _) => {
        thisTeam.GetRandomCharacter().physicalImmunity = true;
    },

    StrengthEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.damage.bonus = 3;
        });
    },

    
    HermitEffect: (thisTeam, thatTeam) => {
        
    },


    Wheel_of_FortuneEffect:(thisTeam, _) =>{
        let rand = Math.floor(Math.random()*2); //Da un numero aleatorio entre 0 y 1
        let fortune;

        if(rand == 1) fortune = 1;
        else fortune = -1; 

        thisTeam.entities.forEach(e => {
            e.damage.bonus = fortune;
            e.luck.bonus = fortune;
            e.defense.bonus = defense;
        });
    },


    JusticeEffect: (thisTeam, thatTeam) => {
        //Esta carta tiene unos efectos diferentes según cual sea el equipo receptor
        //Carta obtenida por el team de la party
        if(thisTeam.name == "Party"){
            thisTeam.entities.forEach(e => {
                e.damage.bonus = 2;
                e.luck.bonus = 2;
                e.defense.bonus = 2;
    
            });
        }
        //Carta obtenida por los enemigos
        else{
            let enemy = thisTeam.GetRandomCharacter();
            let character = thatTeam.GetRandomCharacter();

            enemy.health = character.health;
            enemy.luck = character.luck;
            enemy.damage = character.damage;
            enemy.defense = character.defense;
        }
    },
    
    Hanged_ManEffect: (thisTeam, _) => {
        thisTeam.GetRandomCharacter().health.quantity = 1;
    },

    DeathEffect: (thisTeam, _) => {
        thisTeam.GetRandomCharacter().Die();
    },
    
    TemperanceEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.health.bonus = 5;
        });
    },

    DevilEffect: (thisTeam, _) => {
        let first = thisTeam.GetRandomCharacter();
        first.health.bonus = 2;
        first.defense.bonus = 2;
        first.damage.bonus = 2;
        first.luck.bonus = 2;

        let second = thisTeam.GetRandomCharacterExcept(first);
        second.health.bonus = -2;
        second.defense.bonus = -2;
        second.damage.bonus =  -2;
        second.luck.bonus = -2;
    },

    TowerEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.defense.bonus = 2;
        });
    },

    StarEffect: (thisTeam, _) => {
        let star = thisTeam.GetRandomCharacter();
        star.health.bonus = 5;
        star.defense.bonus = 5;
        star.damage.bonus = 5;
        star.luck.bonus = 5;
    },
    
    MoonEffect: (thisTeam, _) => {
        thisTeam.GetRandomCharacter().ApplyAlteredState(AlteredState.sleep, 3)
    },
    
    SunEffect: (thisTeam, _) => {
        thisTeam.entities.forEach(e => {
            e.healing.bonus = 20;
        })
    },
    
    JudgementEffect: (thisTeam, thatTeam) => {
        
    },
    
    WorldEffect: (thisTeam, _) => {
        thisTeam.GetRandomCharacter().ApplyAlteredState(AlteredState.deaf, 3)
    }
}