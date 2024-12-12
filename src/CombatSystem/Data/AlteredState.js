export const AlteredState =
{
    none: {
        enter: (data) => { data.user.sprite.setTint(0xffffff) },
        check:(_) => {return true},
        exit: (_) => {}
    },
    sleep: {
        enter: (data) => { data.user.sprite.setTint(0xffffcc) },
        check:  (data)=> {
            data.scene.time.delayedCall(1000, ()=>{
                data.phase.emit('next')} 
            );
            data.user.HealAttack(data.user)
            return false
            },
        exit: (_) => {}
    },
    deaf:
    {
        enter: (data) => { data.user.sprite.setTint(0x0000ff) },
        check: (_)=> {return true},
        exit: (_) => {}
    },
    fear: 
    {
        enter: (data) => { data.user.sprite.setTint(0x00ffff) },
        check:(data)=> {
        console.log("Se caga encima")
        let target = data.team.GetRandomCharacterExcept(data.user);
        data.user.MoveTo(target, ()=>{data.phase.emit('next')})
        return false
        },
        exit: (data) => {data.user.MoveTo(data.user)}
    },
    papeado:{
        enter: (data) => { data.user.sprite.setTint(0xffff00) },
        check: (data) => {
            let target = data.team.GetRandomCharacter();
            data.user.MagicAttack(target, ()=>{data.phase.emit('next')})
            return false
        },
        exit: (_) => {}
    },
    no_attack:
    {
        enter: (data) => { data.user.sprite.setTint(0xff0000) },
        check: (_) => {return false},
        exit: (_) => {}
    },
}