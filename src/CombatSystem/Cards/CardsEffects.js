export const CardsEffects = {
    //Si hay algun this es referente a la clase desde la que se llame o el objeto mas cercano a la llamada.
    //Mejor no usar this, sino parametros que se le pasen a las funciones. Si un parametro no se va a usar se pone
    // _ en el lugar donde iria dicho parametro en los parentesis de la funcion

    FoolEffect: (_)=> {
        console.log("Fool effect.");
    },

    MagicianEffect: (team) => { 
        console.log("Magician effect.");
    }
    


}