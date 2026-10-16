---
layout: default
title: Videojuego
nav_order: 7
---

# After Dark

En esta práctica desarrollé **After Dark**, un videojuego de plataformas en 2D inspirado en la estética cyberpunk de *The Matrix*. La idea es escapar de los agentes, recorrer distintos sectores y encontrar una cabina telefónica para salir de cada nivel. Quería que no fuera solamente un juego funcional, sino que también tuviera una atmósfera propia, personajes diferentes y dificultad progresiva.

## Juega aquí

<iframe src="{{ site.baseurl }}/juegos/after-dark/" title="After Dark — videojuego de plataformas" loading="lazy" style="width:100%;height:850px;border:1px solid #26373e;border-radius:8px;background:#05090d;" allow="fullscreen"></iframe>

[**Abrir el juego en una pestaña nueva ↗**]({{ site.baseurl }}/juegos/after-dark/)

## ¿Cómo se juega?

- **Moverse:** flechas del teclado o las teclas A y D.
- **Saltar:** barra espaciadora o flecha hacia arriba.
- **Doble salto:** con Nyx, vuelve a presionar saltar mientras estás en el aire.
- **Pausar:** tecla P o Escape.
- **Objetivo:** correr, saltar entre plataformas, esquivar obstáculos y agentes, recoger fragmentos de datos y llegar a la cabina telefónica.
- **Niveles:** hay tres sectores con recorridos diferentes. Cada uno aumenta la dificultad y los agentes se vuelven más rápidos.
- **Personajes:** puedes elegir entre Ghost, Glitch, Echo y Nyx. Cada uno tiene un diseño y una habilidad distinta.

En celular aparecen controles táctiles en la parte inferior del juego.

## Personajes

- **Ghost:** personaje equilibrado, con capucha y máscara.
- **Glitch:** es el más rápido; tiene cabello puntiagudo, bufanda y un brazo mecánico.
- **Echo:** puede saltar más alto y lleva una capucha amplia y un abrigo largo.
- **Nyx:** personaje femenino con coleta larga, chaqueta asimétrica y doble salto.

## ¿Cómo está organizado?

El juego está hecho con tres archivos principales dentro de `juegos/after-dark/`:

- **`index.html`:** contiene la estructura, la pantalla de inicio y la selección de personajes.
- **`style.css`:** define los colores, la estética cyberpunk, las animaciones y el diseño adaptable.
- **`game.js`:** controla el movimiento, los saltos, las plataformas, los obstáculos, los agentes, los niveles y las condiciones de victoria o derrota.

También añadí una introducción tipo terminal de computadora que muestra mensajes de inicialización antes de empezar. La intención es que parezca que el sistema está cargando la simulación. Al terminar o perder hay transiciones animadas para que las pantallas no aparezcan de golpe.

## Prompt utilizado

Para crear el juego utilicé inteligencia artificial como apoyo. Este fue el prompt principal que describe la idea y las características que quería:

> Crea un videojuego de plataformas en 2D llamado **After Dark**, usando HTML, CSS y JavaScript, para integrarlo en mi portafolio publicado con GitHub Pages. Quiero una estética cyberpunk inspirada en *The Matrix*: fondos oscuros, detalles verdes tipo código, ambiente retro y una interfaz cuidada. El juego debe sentirse completo y pulido, no como una demo básica.
>
> Incluye una pantalla de inicio, selección de personajes, controles claros, plataformas a distintas alturas, obstáculos, objetos coleccionables y agentes que persigan al jugador. El objetivo de cada nivel es sobrevivir al recorrido y llegar a una cabina telefónica que funcione como salida. Crea tres niveles con diseños diferentes y dificultad progresiva. Usa personajes pixel art que se distingan por su silueta, ropa y habilidades, no solamente por sus colores, e incluye por lo menos un personaje femenino. Haz que los agentes sean más rápidos y numerosos en los niveles avanzados.
>
> Añade animaciones al inicio y al final del juego. Para la introducción, quiero una pantalla como una computadora ejecutando código, con dígitos, mensajes de terminal y una barra de carga antes de mostrar la selección de personaje. Incluye efectos visuales tipo glitch, una interfaz coherente, controles de teclado y controles táctiles para celular. Separa el proyecto en archivos HTML, CSS y JavaScript, mantén el código organizado y asegúrate de que las rutas funcionen en GitHub Pages.

Después fui ajustando la idea con instrucciones más específicas, por ejemplo:

> Haz los niveles más difíciles conforme avanzas, diferencia de verdad los diseños y habilidades de los personajes, aumenta la velocidad de los agentes, crea recorridos menos repetitivos y asegúrate de que la cabina telefónica sea la salida real del nivel. Agrega una animación de inicio como una computadora programando con dígitos y transiciones al comenzar y terminar el juego.

## ¿Qué aprendí?

Esta práctica me sirvió para combinar HTML, CSS y JavaScript en un proyecto interactivo. También entendí que crear un juego no es solamente hacer que el personaje se mueva: hay que pensar en los controles, la dificultad, el diseño de los niveles, las colisiones y la forma en que el jugador sabe qué hacer.

La inteligencia artificial me ayudó a desarrollar y mejorar partes del código, pero fue necesario revisar las funciones y hacer ajustes a partir de lo que quería conseguir. Una parte importante del proceso fue convertir una idea general en instrucciones concretas y después ir puliendo el resultado.
