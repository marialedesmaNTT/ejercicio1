# Pokédex

Aplicación React que consume la PokéAPI para mostrar un listado de pokémon con paginación y página de detalle individual.

## Funcionalidades

- Listado de pokémon consumiendo la PokéAPI
- Paginación de 24 pokémon por página
- Estados de carga, error y vacío gestionados
- Botón de reintento cuando falla la conexión
- Página de detalle con nombre, id, sprite, tipos, altura, peso y estadísticas base
- Error controlado en el detalle sin que la app se rompa
- Al volver del detalle se mantiene la página donde estabas

## Tecnologías

- React
- Vite
- JavaScript
- PokéAPI (https://pokeapi.co)

## Instalación y ejecución

1. Clonar el repositorio:
```
git clone https://github.com/marialedesmaNTT/ejercicio1.git
```
2. Entrar en la carpeta del proyecto:
```
cd ejercicio1
```
3. Instalar dependencias:
```
npm install
```
4. Ejecutar el proyecto:
```
npm run dev
```
5. Abrir en el navegador:
```
http://localhost:5173
```

No hace falta ningún archivo `.env` ni configuración adicional, la API es pública.

## Estructura del proyecto

```
src/
  components/
    TarjetaPokemon.jsx
  pages/
    DetallePokemon.jsx
    ListaPokemon.jsx
  App.jsx
  constants.js
  index.css
  main.jsx
```

## Decisiones técnicas

- Se usó Vite en vez de create-react-app porque es más rápido y es lo que recomienda la documentación oficial de React actualmente.
- La navegación entre lista y detalle se resolvió con un estado en `App.jsx` en vez de usar React Router, ya que solo hay dos vistas y no merecía la pena añadir una dependencia extra.
- La página actual también se guarda en `App.jsx` para que al volver del detalle no se pierda la posición.
- Los datos de cada pokémon se cargan con `Promise.all` porque la API de listado solo devuelve nombre y URL, no los detalles completos.
- Las constantes como la URL base y los colores de tipos están separadas en `constants.js` para no repetirlas por todo el código.

## Mejoras futuras ⁉️

- Añadir buscador por nombre
- Filtrar por tipo de pokémon
- Animación de transición entre lista y detalle
- Guardar favoritos en localStorage
- Tests automáticos

## Autora

María Ledesma Zotano - 2026

### Anotaciones

Faltan por subir los vídeos !