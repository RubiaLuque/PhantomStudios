Vincere Fabulam  
---

Documento de diseño del juego

1. **Idea básica del juego:**

El juego consistirá en un **rpg estilo clásico** (*Chrono Trigger*, *Golden Sun*, *Final Fantasy*…) en el que un grupo de desarrolladores de videojuegos se quedarán encerrados dentro del mundo de los videojuegos y deberán luchar contra sus profesores, que han materializado ideas en forma de mundos que el equipo debe recorrer, y vencerlos para escapar de su encierro.

2. **Cartas que se van a utilizar:**

* d07 \- Dentro de la mente  
* a22 \- Mitología  
* m01 \- *Fire Emblem*  
* p02 \- Profesores de la FdI  
* e09 \- Maracas de insignias

3. **Mecánicas principales:**

- **Mapas y niveles**:

El juego se estructura en **3 niveles** bien diferenciados en los que los jugadores recorrerán una pequeña mazmorra en la que, ocasionalmente, se encontrarán con **enemigos** con los que deben **luchar**. Cada mazmorra tendrá **de 3 a 5 enemigos** además de un **jefe final** que marca el fin del nivel. Tras derrotarlo se pasa al siguiente. Estas mazmorras serán verticales u horizontales, según en cuál nos encontremos, y constan de **plataformas** y **puzzles** que resolver para seguir avanzando.

- **Combate:**

Cada vez que comience un combate, antes de empezar, habrá una **lectura de cartas** en la que se le dará tanto a jugadores como a enemigos, **de forma aleatoria**, una carta del tarot que les proporcionará algún tipo de **ventaja o desventaja**. Estos potenciadores pueden ser un aumento/disminución de alguna stat, algún efecto en algún personaje, alguna debilidad o pueden incluso ocasionar la muerte de alguno de nuestros personajes o de los enemigos.   
La única forma de conseguir **efectos de estado en los enemigos** es a través de las cartas. Los **jefes también pueden causar efectos de estado en el grupo**.

Estados alterados:

- Sueño: no puede actuar pero recupera un poquito de vida  
- Sordo: no puede curar ni ser curado  
- Miedo: se esconde detrás de un compañero, haciendo que todo el daño lo reciba este  
- Papeado: actúa contra los compañeros

Los combates son **por turnos** al estilo de los juegos clásicos referenciados previamente. El combate tendrá una disposición **lateral** al estilo de juegos como Fnaf World o los FF clásicos. La **primera** persona en atacar es siempre el **jugador**. A lo largo de su **turno** los personajes controlables por el jugador se irán seleccionando **uno a uno** y este podrá elegir qué hacer con cada miembro del equipo. El ataque se ejecutará **nada más sea seleccionado**, es decir, sin tener que esperar a que el enemigo escoja su ataque para resolverlos a la vez. 

El jugador podrá elegir, para cada miembro del equipo, hacer un **ataque físico** o un **ataque mágico**. Los ataques físicos son ataques que quitan vida al enemigo. Mientras que los ataques mágicos dependen del **elemento** que tenga el personaje que lo vaya a utilizar. Cada personaje tiene un **elemento diferente**. Hay **hasta 4 elementos**, 1 por cada miembro del equipo y los enemigos son **débiles** (reciben más daño) o **resistentes** (reciben menos daño) a determinados elementos según el tipo de enemigo que sea. El sistema de debilidades y fortalezas seguirá la misma mecánica que piedra-papel-tijeras, pero con 4 elementos. 

Además, para equilibrar el juego, los ataques mágicos neutrales hacen **menos daño** que los ataques físicos. A mayores, cada personaje tendrá **1 curación por combate** para poder curarse en caso de estar en una situación comprometida.

Por otro lado, cada miembro de la party tendrá **stats** distintos, por lo que, mezclado con lo anterior, el jugador deberá gestionar bien cómo utiliza a cada personaje. 

Miembros del equipo protagonista:

| Miembro | Elemento | Vida | Ataque | Defensa | Suerte |
| :---- | :---- | :---- | :---- | :---- | :---- |
| Fueyo | Ira | 10 | 7 | 10 | 7 |
| Javi | Lujuria | 10 | 10 | 7 | 7 |
| Muxu | Ansiedad | 10 | 7 | 7 | 10 |
| Mika | Depresión | 15 | 7 | 7 | 7 |

Los puntos de vida funcionan como en cualquier otro juego; el ataque y la defensa son modificadores que se añaden al daño que hacen los ataques y el daño recibido, respectivamente; la suerte, por último, es un modificador que se añade a la probabilidad de ejecutar un ataque crítico.

- **Fuera de combate:**

La **salud** del equipo se **guarda entre combates**, para recuperarla existirán **puntos de salud** colocados por la mazmorra en los que los jugadores podrán **recobrar su salud**. Al finalizar cada combate, si un miembro del equipo ha perdido todos sus puntos de vida, revivirá con 1 único punto de vida con el que se mantendrá hasta ser curado.

- **Sistema de relaciones:**

A lo largo de la partida el jugador podrá encontrarse a **profesores de la facultad como NPCs** rescatables que pueden llevar a la **zona de curación: la cafetería**. Esto utilizará un **sistema de relaciones** en el que, **hablando** con los profesores, el jugador podrá aumentar su relación con ellos y obtener mejoras o pistas sobre cómo derrotar a los jefes finales de cada sección.

Profesores como posibles NPCs:

- Miki  
- Toni  
- Mozos  
- Rubén

**3.1 Mecánicas específicas de los jefes:**

Cada mazmorra tendrá una **estética diferente** en función del jefe de dicha mazmorra. 

Los jefes tendrán **2 fases**, una **fase más genérica** en la que el combate transcurre con normalidad, y **otra fase en la que habrá una mecánica especial** y única a cada uno. Además, cada uno de ellos es una representación de una mitología diferente y el súmmum de un mundo abstracto que se manifiesta en la sección previa a su encuentro.

**Primer Jefe***: Mitología Azteca \- Jaime, Dios de la Música*

- Combate: En su segunda fase este jefe haría uso de la **música** del juego para atacar y provocar estados alterados como sordo, si la música es muy alta; papeado, si se trata de la canción favorita de un miembro del grupo; o sueño, si se trata de una nana. Como su música cambia rápidamente, estos estados no duran mucho tiempo.  
- Tipo: Este jefe es de tipo neutral, por lo que no tiene afinidades hacia otros tipos.  
- Mundo abstracto: el nivel 1 corresponde a su mundo y es aquel que existe en el timbre y el sonido de la música. Etéreo e inalcanzable.

**Segundo Jefe:** *Mitología Lovecraftiana* \- *Víctor Lavín, Señor del Engaño y la Oscuridad*

- Combate: En su segunda fase este jefe utilizará **captchas** que el jugador deberá realizar correctamente. En caso de acertar, el jefe recibirá bastante daño. Si se falla, el jefe ejecutará un ataque de boomerang lanzando un plátano que hace daño de área a toda la party.  
- Tipo: jefe de tipo Lujuria. Es débil frente a ataques mágicos de ansiedad y resiste aquellos de depresión.  
- Mundo abstracto: el mundo de Víctor Lavín presenta una decadencia oscura y profunda que se traga todo a su alrededor. Inspirado en la Fosa de las Marianas y lugares tenebrosos lejos del alcance de los seres humanos y en el propio canal de YouTube de este profesor.

**Tercer Jefe***: Mitología griega \- Pascal, Rey de los Sueños:*

- Combate: En su segunda fase este jefe es capaz de provocar **sueño** en los miembros de la party, un efecto que los inutiliza durante un tiempo mayor al habitual en anteriores combates. Para descubrir cómo derrotar a este jefe será necesario **acceder al código del juego desde el inspector de la página**.  
- Tipo: este jefe es de tipo ansiedad, por lo que es fuerte contra ataques del elemento lujuria y débil a aquellos de tipo ira.  
- Mundo abstracto: este mundo trata de aquel que se encuentra entre las pesadillas y los sueños. Es enrevesado y está lleno de elementos oníricos.

**3.1 La cafetería de la FDI**

A lo largo de cada nivel, nos podremos encontrar con un espacio común que todos en la Facultad de Informática de la UCM conocen: su famosa cafetería con su aún más famosos integrantes Andrés y Sánchez. Este lugar sirve como punto de encuentro con los NPCs que rescatemos a lo largo de la aventura y lugar de curación gracias al Turbobocadillo XXL que nos prepararán Andrés y Sánchez para ayudar a la party a recuperarse y seguir con su periplo de salvar a la FDI del caos que han ocasionado los 3 jefes anteriormente mencionados. 

**4\. Dinámica**

La dinámica del juego estará centrada en los **combates y los puzzles**.

- **Puzzles**

En los puzzles la dinámica está clara. Los jugadores deberán **razonar y poner todo su intelecto sobre la mesa para poder completar los minijuegos o acertijos que creados** para el juego. La idea es que sean complicados pero no imposibles y que los jugadores tengan que darle un par de vueltas antes de dar con la solución. En cada nivel habrá puzzles diferentes.

- **Combates**

La otra parte donde la dinámica es relevante es en los combates en los que los jugadores deberán **hacer uso de las ventajas de tipos, stats de personajes y curaciones para gestionar y** ganar los combates. También deberán estar pendientes de la **carta que reciben ellos y el enemigo**, pues esta carta puede cambiar la estrategia ganadora completamente. En el caso de los jefes habrá una **mecánica extra** que dificultará más esta gestión.

**5\. Arte y visión artística**

**5.1. Lore e historia en profundidad:**

La historia consiste en que Phantom Studios (nosotros) se ha visto arrastrado por alguna fuerza mágica aún por descubrir al mundo de los videojuegos. Allí dentro, el grupo descubrirá que, sea lo que sea lo que los ha mandado a ese mundo, no los dejarán salir a no ser que acaben con los gobernantes de los mundos que habitan ahí dentro.

El grupo empezará en el mundo azteca de la música, que, como su nombre indica, habita en la propia música. Tras recorrer sus laberintos y trampas tendrán que enfrentarse a Jaime fusionado con Huehuecoyotl (Dios azteca de la música) que atacará a los miembros del grupo con música.

Tras eso avanzarán al siguiente escenario, el canal de youtube de Víctor Lavin, que habrá hecho un pacto con los dioses lovecraftianos para defender y mejorar su canal. Allí tendrán que sortear todos los sistemas de defensa, incluyendo tanto antivirus como entidades lovecraftianas, para llegar hasta Víctor Lavín fusionado con Cthulhu y superar sus captchas.

Finalmente los jugadores acabarán en el mundo de los sueños, tanto en el sentido de sueños oníricos, como sueños de esperanzas y anhelos. Los jugadores avanzarán por la ominosa última fase hasta el jefe final, el más complicado de todos: Pascal fusionado con Morfeo, que atacará a la party con ataques adormecedores y obligará a buscar alternativas para derrotarlo en el código.

Una vez finalizado el último combate Phantom Studios será liberado de vuelta al mundo terrenal.

**5.2. Estilo artístico**

El estilo del juego cambia según el mundo en el que nos encontremos, pero los trazos generales son colores apagados mezclados con pequeños tintes dorados, azules o rojos.

Las cartas del tarot, de creación propia, son negras con líneas blancas y doradas. 

**6\. Bocetos del juego**

**7\. Redes sociales**

[GitHub](https://github.com/RubiaLuque/PhantomStudios)  

[Twitter](https://x.com/Phantom_Stud1os)

