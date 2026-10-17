---
layout: default
title: Videojuego
nav_order: 7
---

# After Dark

En esta práctica desarrollé **After Dark**, un videojuego de plataformas en 2D inspirado en la estética cyberpunk de *The Matrix*. La idea es escapar de los agentes, recorrer sectores cada vez más grandes y encontrar una cabina telefónica para salir de cada nivel. El primer sector empieza en una ciudad lluviosa, donde hay que seguir a un conejo blanco. Al escapar, los personajes dejan atrás su ropa normal y desbloquean un estilo mucho más cyberpunk.

## Juega aquí

<iframe src="{{ site.baseurl }}/juegos/after-dark/" title="After Dark — videojuego de plataformas" loading="lazy" style="width:100%;height:850px;border:1px solid #26373e;border-radius:8px;background:#05090d;" allow="fullscreen"></iframe>

[**Abrir el juego en una pestaña nueva ↗**]({{ site.baseurl }}/juegos/after-dark/)

## ¿Cómo se juega?

- **Moverse:** flechas del teclado o las teclas A y D.
- **Saltar:** barra espaciadora o flecha hacia arriba.
- **Doble salto:** con Nyx, vuelve a presionar saltar mientras estás en el aire.
- **Dash:** Shift o X para hacer un impulso rápido y evitar a los agentes.
- **Pausar:** tecla P o Escape.
- **Sonido:** puedes activar o desactivar los efectos desde el botón debajo del juego.
- **Objetivo:** correr, saltar entre plataformas, esquivar obstáculos y agentes, recoger fragmentos de datos y llegar a la cabina telefónica.
- **Niveles:** hay tres sectores más grandes, con ambientaciones y recorridos distintos. La dificultad y la velocidad de los agentes aumentan en cada uno.
- **Plataformas móviles:** algunas se desplazan de lado a lado o suben y bajan, así que hay que calcular bien los saltos.
- **Fragmentos de memoria:** hay tres secretos escondidos en cada sector. Si encuentras los nueve, desbloqueas un final alternativo.
- **Agentes:** no todos se comportan igual; algunos persiguen directamente, otros saltan y otros pueden aparecer más adelante.
- **Personajes:** puedes elegir entre Ghost, Glitch, Echo y Nyx. Cada uno tiene un diseño y una habilidad distinta.

En celular aparecen controles táctiles en la parte inferior del juego, incluidos los botones para saltar y hacer dash. También agregué efectos de sonido para saltos, objetos, el impulso y las transiciones.

## Personajes

- **Ghost:** personaje equilibrado.
- **Glitch:** es el más rápido.
- **Echo:** puede saltar más alto.
- **Nyx:** personaje femenino con doble salto.

Al principio llevan ropa cotidiana. Después del primer nivel, cada personaje cambia a un atuendo más llamativo, con colores neón y detalles tecnológicos. Así, el cambio de ropa también marca el paso de la ciudad normal a una realidad más extraña.

## ¿Cómo está organizado?

El juego está hecho con tres archivos principales dentro de `juegos/after-dark/`:

- **`index.html`:** contiene la estructura, la pantalla de inicio y la selección de personajes.
- **`style.css`:** define los colores, la estética cyberpunk, las animaciones y el diseño adaptable.
- **`game.js`:** controla el movimiento, el dash, los saltos, las plataformas móviles, los objetos coleccionables, el conejo, los agentes, el sonido, los niveles y los finales.

También agregué una barra de progreso, avisos durante la partida y una dificultad más marcada. La cabina telefónica ahora tiene una pequeña secuencia de escape: al llegar, suena y se activa la transición al siguiente sector.

También añadí una introducción tipo terminal de computadora que muestra mensajes de inicialización antes de empezar. La intención es que parezca que el sistema está cargando la simulación. Al terminar o perder hay transiciones animadas para que las pantallas no aparezcan de golpe.

## Prompt utilizado

Este fue el prompt principal que utilicé para definir el juego:

> Crea un videojuego de plataformas en 2D llamado **After Dark**, usando HTML, CSS y JavaScript, para integrarlo en mi portafolio publicado con GitHub Pages. Quiero una estética cyberpunk inspirada en *The Matrix*, con lluvia, luces neón, fondos oscuros, detalles verdes tipo código, pixel art y una interfaz cuidada. El juego debe sentirse como una pequeña aventura completa, no como una demo básica.
>
> Incluye una pantalla de inicio animada como una computadora arrancando, selección entre cuatro personajes con habilidades distintas, controles claros, coleccionables, obstáculos, agentes que persigan al jugador y una cabina telefónica que funcione como salida de cada nivel. Haz tres niveles largos, con escenarios y recorridos diferentes, dificultad progresiva, huecos, plataformas a distintas alturas y plataformas móviles que se desplacen horizontal y verticalmente.
>
> En el primer nivel, ambientado en una ciudad lluviosa, el personaje debe seguir a un conejo blanco que le sirve de guía. Al terminar ese nivel, transforma la apariencia de los personajes: empiezan con ropa cotidiana y después desbloquean atuendos más futuristas y llamativos. Mantén diferencias reales entre sus habilidades: un personaje equilibrado, uno más rápido, uno que salta más alto y uno con doble salto.
>
> Haz que los agentes tengan comportamientos diferentes: algunos persiguen directamente, otros saltan obstáculos y alguno puede teletransportarse para aparecer por delante. Aumenta la velocidad y la presión de los agentes en los niveles avanzados. Incluye un dash con tiempo de recarga, fragmentos de datos para sumar puntos y tres fragmentos de memoria secretos por nivel. Si se encuentran los nueve fragmentos, desbloquea un final alternativo.
>
> Añade efectos de sonido para los saltos, coleccionables, dash, teléfono y transiciones, con una opción para activar o desactivar el sonido. Incluye una barra de progreso, indicador de peligro, animación de escape en la cabina telefónica y transiciones entre niveles. Los controles deben funcionar con teclado y en celular. Separa el proyecto en HTML, CSS y JavaScript, mantén el código organizado y asegúrate de que las rutas funcionen en GitHub Pages.

Después fui ajustando el juego con instrucciones más específicas para ampliar los niveles, hacer que las plataformas móviles fueran parte real del recorrido, mejorar la persecución de los agentes y lograr que el conejo blanco, el cambio de ropa y los fragmentos secretos formaran parte de la experiencia, en lugar de ser solo detalles visuales.

## ¿Qué aprendí?

Esta práctica me sirvió para combinar HTML, CSS y JavaScript en un proyecto interactivo. También entendí que crear un juego no es solamente hacer que el personaje se mueva: hay que pensar en los controles, la dificultad, el diseño de los niveles, las colisiones y la forma en que el jugador sabe qué hacer.

La inteligencia artificial me ayudó a desarrollar y mejorar partes del código, pero fue necesario revisar las funciones y hacer ajustes a partir de lo que quería conseguir. Una parte importante del proceso fue convertir una idea general en instrucciones concretas y después ir puliendo el resultado.
