# Pokédex

Este es un proyecto de Pokédex desarrollado con Next.js. Permite explorar información sobre Pokémon de manera interactiva y en tiempo real utilizando la PokéAPI.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (v18 o superior) (Obligatorio)
- [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/) (RECOMENDADO)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/JuanPCabana/pokeapp
   cd pokedex
   ```

2. En caso de estar en linux o WSL usa el siguiente comando para usar la version de node recomendada para el proyecto:

   ```bash
   nvm install && nvm use
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

## Ejecución en Local

Para ejecutar el proyecto en tu entorno local, sigue estos pasos:

1. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

2. Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000).

## Ejecución con Docker

Este proyecto también se puede ejecutar utilizando Docker. Luego de clonar el repositorio sigue los pasos a continuación:

### Con Docker

1. Construye la imagen Docker:

   ```bash
   docker build -t pokedex .
   ```

2. Ejecuta el contenedor:

   ```bash
   docker run -p 3000:3000 pokedex
   ```

### Con Docker Compose

1. Ejecuta el proyecto con Docker Compose:

   ```bash
   docker-compose up
   ```

2. Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000).

## Herramientas usadas

Para el desarrollo del proyecto se usaron varias herramientas entre las cuales estan :

- Next.Js V14
- TypeScript
- Tailwind
- Shadcn
- Redux Toolkit
- Axios
- @svgr/webpack