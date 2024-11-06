export const AlteredState =
{
    none: () => {return true},
    sleep: (data)=> {
        data.scene.time.delayedCall(1000, ()=>{
            data.phase.emit('next')} 
        );
        this.Heal(15)
        return false
    },
    deaf: ()=> {return true},
    fear: (data)=> {
        let target = data.team.GetRandomCharacterExcept(target);
        this.MoveTo(target.sprite.position, data.phase.emit('next'))
        return false
    },
    papeado: (data)=> {
        let target = data.team.GetRandomCharacterExcept(target);
        this.MagicAttack(target, data.phase.emit('next'))
        return false
    }
}