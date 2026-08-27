---
layout: default
title: Semana 1: Portafolio Web
nav_order: 3
---

## 2. Crear el proyecto en GitHub

Para empezar mi proyecto, utilicé un repositorio que ya venía como plantilla. Básicamente, este repositorio ya tenía la estructura necesaria, así que no tuve que crear todo desde cero.

El repositorio que utilicé fue:

[Repositorio plantilla](https://github.com/HuberGiron/portafolio-just-the-docs)

### Ruta A: Hacer un Fork del repositorio

Esta fue la opción que utilicé porque es la más fácil. Un **Fork** básicamente crea una copia del repositorio original, pero ahora en tu propia cuenta de GitHub.

**Paso 1.** Primero abrí el repositorio plantilla en GitHub.

*[Aquí va una imagen del repositorio original antes de hacer el Fork]*

**Paso 2.** Después, en la parte superior derecha, hice clic en el botón **Fork**.

*[Figura 2. Aquí va una captura del botón Fork]*

**Paso 3.** GitHub me llevó a una pantalla donde tenía que configurar la copia del repositorio.

Ahí seleccioné:

* **Owner:** mi usuario de GitHub.
* **Repository name:** el nombre que quería ponerle a mi repositorio.

Después hice clic en **Create fork**.

*[Figura 3. Configuración y creación del Fork]*

Y listo. Ahora ya tenía una copia completa del proyecto en mi propia cuenta de GitHub, sin tener que descargar y volver a subir todos los archivos manualmente.

---

### Ruta B: Crear un repositorio desde cero

También existe otra forma de hacerlo, aunque esta no fue la que utilicé. Esta opción sirve si necesitas crear un repositorio completamente nuevo.

Primero tienes que ir a GitHub y hacer clic en **New repository**.

*[Figura 4. Botón para crear un repositorio nuevo]*

Después eliges el nombre del repositorio y haces clic en **Create repository**.

Luego tienes que descargar los archivos del proyecto original. Para eso puedes ir a:

**Code → Download ZIP**

*[Figura 5. Descargar el proyecto como archivo ZIP]*

Después de descargarlo, tienes que descomprimir el archivo. Ya con los archivos listos, puedes subirlos a tu nuevo repositorio desde:

**Add file → Upload files**

Arrastras los archivos, esperas a que se suban y finalmente haces clic en **Commit changes**.

*[Figura 6. Subiendo los archivos al repositorio]*

---

## 3. Abrir el proyecto con Codespaces

Después de tener mi repositorio listo, necesitaba poder editar los archivos del proyecto.

Para eso utilicé **GitHub Codespaces**, que básicamente te permite abrir una especie de Visual Studio Code directamente desde el navegador, sin tener que instalar nada.

Dentro de mi repositorio hice clic en:

**Code → Codespaces → Create codespace on main**

*[Figura 7. Creando un Codespace]*

Después de unos minutos, GitHub abrió el proyecto en un editor parecido a VS Code.

*[Figura 8. Proyecto abierto en Codespaces]*

La primera vez puede tardar un poco mientras se carga todo, pero después ya puedes empezar a modificar los archivos directamente.

---

## 4. Configurar el archivo `_config.yml`

Una vez dentro de Codespaces, tuve que configurar el archivo llamado `_config.yml`.

Este archivo es importante porque aquí se indica cuál será la dirección de la página web y en qué repositorio se encuentra.

Busqué el archivo `_config.yml` en el explorador de archivos y cambié estas dos líneas:

```yaml
url: "https://TU_USUARIO.github.io"
baseurl: "/TU_REPO"
```

En mi caso, tuve que reemplazar **TU_USUARIO** por mi usuario de GitHub y **TU_REPO** por el nombre de mi repositorio.

Por ejemplo, quedaría algo así:

```yaml
url: "https://valeriara7.github.io"
baseurl: "/portafolio-valeramosa"
```

*[Figura 9. Editando el archivo `_config.yml`]*

Es importante que el nombre que pongas en `baseurl` sea exactamente igual al nombre de tu repositorio, porque si no coincide, algunas cosas de la página, como los links o los estilos, pueden dejar de funcionar correctamente.

---

## 5. Hacer cambios y guardarlos en GitHub

Después de configurar todo, hice un pequeño cambio en uno de los archivos para empezar a modificar mi página.

Por ejemplo, puedes cambiar el archivo `index.md`, que es uno de los archivos principales del proyecto.

*[Figura 10. Editando uno de los archivos del proyecto]*

Cuando terminé de hacer el cambio, fui a la sección de **Source Control**, que es el ícono de la rama que aparece en la barra lateral izquierda.

Ahí aparecieron todos los archivos que había modificado.

*[Figura 11. Source Control mostrando los cambios]*

Después escribí un mensaje explicando qué cambio había hecho. Por ejemplo:

`Actualiza portada`

Luego hice clic en **Commit**.

Finalmente, hice clic en **Sync Changes** o **Push** para subir mis cambios a GitHub.

*[Figura 12. Haciendo Commit y Sync Changes]*

Básicamente, lo que pasó fue esto:

1. Primero hice cambios en los archivos.
2. Con el **Commit**, guardé esos cambios como una nueva versión.
3. Con **Push** o **Sync Changes**, envié esos cambios a mi repositorio en GitHub.

Después GitHub se encargó de actualizar la página con los cambios nuevos.

---

## 6. Activar GitHub Pages

Después de subir los archivos, tenía que hacer que el proyecto se pudiera ver como una página web.

Para eso regresé a mi repositorio en GitHub y entré a:

**Settings → Pages**

*[Figura 13. Entrando a la configuración de GitHub Pages]*

En la sección de **Build and deployment**, configuré:

* **Source:** Deploy from a branch
* **Branch:** `main`
* **Folder:** `/ (root)`

Después guardé los cambios.

*[Figura 14. Configuración de GitHub Pages]*

Una vez configurado, GitHub genera una dirección para poder entrar a la página.

La URL normalmente tiene esta estructura:

`https://TU_USUARIO.github.io/TU_REPO/`

En mi caso, la dirección quedó con mi usuario y el nombre de mi repositorio.

---

## 7. Verificar que la página se publicó correctamente

Finalmente, para comprobar que todo había funcionado, regresé al repositorio y abrí la pestaña de **Actions**.

Ahí GitHub muestra el proceso que sigue para construir y publicar la página.

*[Figura 15. Pestaña Actions]*

Busqué el proceso relacionado con **pages build and deployment** y esperé a que apareciera en verde, lo que significa que terminó correctamente.

*[Figura 16. Proceso terminado correctamente]*

Después regresé a:

**Settings → Pages**

Ahí ya pude abrir la URL de mi página y comprobar que el sitio estaba publicado correctamente.

Y listo. Después de eso, cada vez que hago cambios en los archivos y los subo a GitHub, la página se vuelve a actualizar.
