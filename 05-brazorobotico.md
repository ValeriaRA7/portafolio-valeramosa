---
layout: default
title: Brazo Robótico
nav_order: 6
---
# Proyecto: Brazo robot de 3 grados de libertad y pinza

## Introducción y Requerimientos
Para esta práctica en pareja, el objetivo principal fue diseñar y armar un brazo robot que cumpliera con varias especificaciones técnicas basadas en las instrucciones del profesor:

### Actuadores: 
Usamos un total de 4 servomotores (2 potentes MG995 para las articulaciones principales y 2 SG90 más ligeros para los movimientos finos y la pinza).

### Control: 
El sistema se controló mediante un Arduino y potenciómetros, tal como lo vimos en clase.

### Estructura: 
Se fabricó con corte láser utilizando MDF de 3 mm, manteniendo un tamaño compacto y menor a los 30 cm (aproximadamente 20 cm).

### Pinza: 
Diseñada específicamente con la apertura y fuerza necesarias para agarrar y sostener sin problema una pelota de 6 cm de diámetro.

## Diseño y Planos en SOLIDWORKS
Para cumplir con la documentación, realizamos el modelado en SOLIDWORKS de cada una de las piezas que conforman la estructura del brazo, incluyendo las cotas y dimensiones necesarias para el corte láser. Como queríamos mantenerlo funcional y sin complicarnos de más, optamos por un diseño bastante simple y directo.

(Aquí puedes insertar o mencionar tus planos de SOLIDWORKS con las cotas).

## Proceso de Fabricación y Ensamble
Una vez que tuvimos los planos listos, mandamos a cortar las piezas en MDF de 3 mm.

La verdad es que no nos complicamos mucho con mecanismos complejos de tornillería o encastres impossibles; la estructura fue bastante sencilla y terminamos pegando todo con resistol. Aunque al principio parecía una buena idea por lo práctico, armarlo y esperar a que todo agarrara bien terminó siendo todo un reto al final del proceso, pero con paciencia logramos que la estructura quedara firme y funcional.

Ya seco el pegamento, montamos los 2 motores MG995 en las bases principales para darle soporte al peso y los 2 SG90 en la parte superior y la pinza.

## Programación y Electrónica
Conectamos los servos al Arduino y configuramos las entradas analógicas con los potenciómetros para mapear los grados de movimiento de cada articulación. Hicimos varias pruebas de código para asegurarnos de que la respuesta fuera suave y precisa, sobre todo al momento de accionar la pinza para que cerrara exactamente al diámetro de la pelota de 6 cm.

## Pruebas y Evaluación
Durante las pruebas logramos que el robot cumpliera con lo pedido: agarrar la pelota y sostenerla durante los 5 segundos requeridos operándolo manualmente con los potenciómetros (incluso nos sirvió para los videos de evidencia de la evaluación).