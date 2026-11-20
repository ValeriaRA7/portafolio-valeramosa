---
layout: default
title: Proyecto Final Impresora
nav_order: 9
---

# Proyecto Final: CNC Plotter

## Introducción

Para el proyecto final trabajamos en el desarrollo de una CNC Plotter de 3 ejes. Esta máquina utiliza un sistema de movimiento cartesiano que permite controlar su posición mediante motores a pasos y ejecutar instrucciones para realizar movimientos precisos.

El objetivo del proyecto fue conocer cómo funciona una máquina CNC, identificar sus componentes mecánicos y electrónicos, y comprender el proceso necesario para pasar de un diseño digital a movimientos físicos de la máquina.

## 1. Arquitectura general

La CNC utiliza una estructura cartesiana de tres ejes. Su funcionamiento se basa en el movimiento coordinado de sus motores, que permiten desplazar el mecanismo en distintas direcciones.

La máquina está formada por diferentes sistemas:

Estructura mecánica: proporciona soporte y estabilidad.

Motores a pasos: generan el movimiento de los ejes.

Mecanismos de transmisión: convierten el movimiento giratorio de los motores en desplazamiento lineal.

Sistema electrónico: controla los motores y recibe las instrucciones.

Software: permite enviar y ejecutar los comandos de movimiento.

## 2. Motores y mecanismos de transmisión

Los motores a pasos son los encargados de generar el movimiento de la máquina. Funcionan mediante pequeños pasos controlados, lo que permite regular el desplazamiento de cada eje.

Los mecanismos de transmisión conectan los motores con las partes móviles de la estructura y transforman su movimiento giratorio en movimiento lineal.

## 3. Diseño mecánico

La estructura de esta CNC utiliza una arquitectura modular basada en perfilería de aluminio y piezas auxiliares.

El diseño modular permite organizar los componentes por secciones y facilita el montaje y mantenimiento de la máquina.

Los tres ejes trabajan de manera coordinada para permitir el desplazamiento del sistema dentro del área de trabajo.

## 4. Hardware y conexiones

El sistema electrónico está compuesto por los siguientes elementos:

Arduino UNO: funciona como controlador principal.

CNC Shield: permite conectar los motores y sus controladores.

Drivers A4988: controlan el funcionamiento de los motores a pasos.

Fuente de alimentación: proporciona la energía necesaria para el sistema de motores.

Estos componentes trabajan en conjunto para recibir las instrucciones y convertirlas en movimientos físicos.

## 5. Software

Para controlar la máquina se utilizan dos programas principales:

GRBL 1.1: firmware que interpreta las instrucciones de movimiento y controla los motores.

OpenBuilds CONTROL: funciona como interfaz para conectar la computadora con la CNC, enviar comandos y ejecutar archivos G-code.

La comunicación con la máquina se realiza mediante una conexión USB al Arduino.

## 6. Calibración

La calibración es importante para conseguir que los movimientos de la máquina correspondan con las distancias indicadas en las instrucciones.

En esta etapa se revisan los movimientos de los ejes y se ajustan los parámetros necesarios para mejorar la precisión.

## 7. Primer archivo G-code

El G-code es un lenguaje de instrucciones utilizado para indicar a la máquina qué movimientos debe realizar.

Los archivos con extensión .nc contienen instrucciones que permiten controlar los desplazamientos y ejecutar una trayectoria determinada.

Antes de ejecutar un archivo es importante revisar que las instrucciones sean compatibles con la máquina y que el área de trabajo esté libre.

## 8. Flujo de trabajo con FabModules

FabModules permite convertir diseños digitales en instrucciones que pueden utilizarse en máquinas de fabricación digital.

El flujo general consiste en partir de un diseño, preparar sus trayectorias y generar el archivo correspondiente para la máquina.

De esta manera, el diseño digital se transforma en instrucciones que la CNC puede interpretar y ejecutar.

## Conclusión

Este proyecto nos permitió conocer los diferentes elementos que forman parte de una máquina CNC y entender cómo se relacionan entre sí. Aprendimos que no basta con tener una estructura mecánica, sino que también es necesario integrar correctamente los motores, la electrónica y el software.

También comprendimos el proceso que existe entre crear un diseño digital y convertirlo en movimientos reales mediante G-code. En general, fue una oportunidad para acercarnos a la fabricación digital y entender cómo funciona una máquina automatizada.