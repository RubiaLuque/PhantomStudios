export const AlteredState =
{
    none: {
        enter: (data) => { data.user.sprite.setTint(0xffffff) },
        check:(_) => {return true},
        exit: (_) => {},
        explanation: ""
    },
    sleep: {
        enter: (data) => { data.user.sprite.setTint(0xffffcc) },
        check:  (data)=> {
            data.scene.time.delayedCall(1000, ()=>{
                data.scene.nextAction();} 
            );
            data.user.HealAttack(data.user)
            return false
            },
        exit: (_) => {},
        explanation: "Dormido: No puede atacar, pero se cura este turno"
    },
    deaf:
    {
        enter: (data) => { data.user.sprite.setTint(0x0000ff) },
        check: (_)=> {return true},
        exit: (_) => {},
        explanation: "Sordo: No puede curar ni ser curado"
    },
    fear: 
    {
        enter: (data) => { data.user.sprite.setTint(0x00ffff) },
        check:(data)=> {
        console.log("Se caga encima")
        let target = data.team.GetRandomCharacterExcept(data.user);
        data.user.MoveTo(target, ()=>{data.scene.nextAction();})
        if(data.user.alteredStateDuration == 0) data.user.MoveTo(data.user, ()=>{data.scene.nextAction();})
        return false
        },
        exit: (_) => {},
        explanation: "Miedo: Se esconde detrás de un aliado y este recibe daño en su lugar"
    },
    papeado:{
        enter: (data) => { data.user.sprite.setTint(0xffff00) },
        check: (data) => {
            let target = data.team.GetRandomCharacter();
            data.user.MagicAttack(target, ()=>{data.scene.nextAction();})
            return false
        },
        exit: (_) => {},
        explanation: "Papeado: Ataca a un aliado aleatorio"
    },
    no_attack:
    {
        enter: (data) => { data.user.sprite.setTint(0xff0000) },
        check: (data) => {
            data.scene.nextAction();
            return false},
        exit: (_) => {},
        explanation: "No ataca: No puede atacar"
    },
}