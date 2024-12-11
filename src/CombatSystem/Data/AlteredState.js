export const AlteredState =
{
    none: (_) => {return true},
    sleep: (data)=> {
        data.scene.time.delayedCall(1000, ()=>{
            data.phase.emit('next')} 
        );
        this.Heal(15)
        return false
    },
    deaf: (_)=> {return true},
    fear: (data)=> {
        console.log("Se caga encima")
        let target = data.team.GetRandomCharacterExcept(data.user);
        data.user.MoveTo(target, data.phase.emit('next'))
        return false
    },
    papeado: (data)=> {
        let target = data.team.GetRandomCharacterExcept(data.user);
        data.user.MagicAttack(target, data.phase.emit('next'))
        return false
    },
    //Un personaje se salta su turno y no ataca. Se usa en la carta de Lovers
    no_attack: (_)=> {return false}
}