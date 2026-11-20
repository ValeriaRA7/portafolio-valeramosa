---
layout: default
title: Semana 1: Portafolio Web
nav_order: 3
---

## 2. ¿Cómo lo hice?

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

Por ejemplo, quedó así:

```yaml
url: "https://valeriara7.github.io"
baseurl: "/portafolio-valeramosa"
```

*[Figura 9. Editando el archivo `_config.yml`]*

Es importante que el nombre que pongas en `baseurl` sea exactamente igual al nombre de tu repositorio, porque si no coincide, algunas cosas de la página, como los links o los estilos, pueden dejar de funcionar correctamente.

---

## 5. Hacer cambios y guardarlos en GitHub

Después de configurar todo, hice cambios en los archivos del proyecto para personalizar mi página.

Por ejemplo, puedes cambiar el archivo `index.md`, que es uno de los archivos principales del proyecto.

*[Figura 10. Editando uno de los archivos del proyecto]*

Cuando terminé de hacer el cambio, fui a la sección de **Source Control**, que es el ícono de la rama que aparece en la barra lateral izquierda.

Ahí aparecieron todos los archivos que había modificado.

*[Figura 11. Source Control mostrando los cambios]*

Después escribí un mensaje explicando qué cambio había hecho. Por ejemplo:

`Actualiza portada`

Luego hice clic en **Commit**.

Finalmente, hice clic en **Sync Changes** o **Push** para subir mis cambios a GitHub.

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

En mi caso, la dirección quedó así:

[`https://valeriara7.github.io/portafolio-valeramosa/`](https://valeriara7.github.io/portafolio-valeramosa/)

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

---

## 8. Personalizar el footer y los colores de la página

Cuando la estructura principal ya estaba lista, también quise personalizar la apariencia de mi portafolio para que tuviera un estilo más propio. Para eso modifiqué dos archivos: `_includes/footer_custom.html` y `assets/css/custom.css`.

### Cambiar el nombre y el texto del footer

El footer es la parte que aparece al final de la página. Ahí se puede mostrar información como el copyright, el nombre de quien creó el sitio, la licencia y la fecha de última modificación.

Para cambiarlo, abrí la carpeta `_includes` y después el archivo:

`_includes/footer_custom.html`

Dentro de ese archivo busqué el texto del copyright y sustituí el nombre de la plantilla por mi nombre: **Valeria Ramos Acevedo**. También ajusté el texto de la licencia y la etiqueta de última modificación.

Un ejemplo de cómo queda esa parte es:

```html
<p class="custom-footer__copy">
  Copyright &copy; 2026 Valeria Ramos Acevedo.
  This work is licensed under
  <a href="https://creativecommons.org/licenses/by/4.0/">
    CC BY 4.0
  </a>.
</p>
```

Lo importante es editar el texto dentro del archivo sin borrar las etiquetas HTML que organizan el footer.

### Cambiar los colores de la página

Para modificar los colores utilicé el archivo:

`assets/css/custom.css`

CSS es el lenguaje que controla la apariencia de una página web, por ejemplo, sus colores, fondos, tamaños de letra y espacios.

En lugar de cambiar cada elemento por separado, agregué reglas al final del archivo para sobrescribir los estilos originales de la plantilla. Elegí una paleta de **negro y verde bosque**, con texto claro para que fuera fácil de leer.

Estos son algunos de los colores principales que utilicé:

| Elemento | Color | Código HEX |
| :-- | :-- | :-- |
| Fondo principal | Negro muy oscuro | `#080B09` |
| Menú lateral | Verde casi negro | `#0D1B12` |
| Superficies | Verde oscuro | `#101812` |
| Títulos | Verde claro | `#A5D6B5` |
| Enlaces | Verde | `#72B88C` |
| Texto | Gris claro | `#E2E9E3` |

Por ejemplo, una regla sencilla para cambiar el fondo y el color del texto es:

```css
body {
  background-color: #080B09;
  color: #E2E9E3;
}
```

Agregué reglas más específicas para que el fondo también cambiara en el contenido, el encabezado y la barra lateral. En algunas partes utilicé `!important` para que los nuevos colores tuvieran prioridad sobre los estilos de Just the Docs.

### Guardar y publicar los cambios

Después de modificar los dos archivos, guardé los cambios y los subí a GitHub con el mismo proceso:

1. `git add .` para preparar los archivos modificados.
2. `git commit -m "Personaliza footer y colores"` para guardar los cambios.
3. `git push origin main` para enviarlos al repositorio.

Cuando GitHub Pages terminó de actualizarse, pude ver el footer con mi nombre y la nueva combinación de negro y verde en el sitio.

Así pude adaptar la plantilla original a una apariencia más personal sin tener que modificar toda la estructura del proyecto.
