# dread-hunger-rolepicker-2

## About this repository

I made the [original role picker](https://github.com/Bladesheng/dread-hunger-rolepicker) with React as a side project to learn how to use React hooks. This time I'm learning SvelteKit, so it seemed only natural to rewrite this as my first project to learn some basics of the framework.

Differences between the this version and the original one:

- SvelteKit instead of React
- Vite instead of Webpack
- Vanila CSS instead of Sass
- Deployment to Github Pages is done with custom github workflow and docker file
- Docker container for local development

### Original description:

Role picker for the game Dread Hunger.

Select 8 players and press the shuffle button. Players will be assigned random roles.

Output is shown on the page and a neatly formated text is also copied to clipboard, so you can immediately paste it to Discord.

Players are saved in localstorage, so you don't have to keep adding their names every time, even when you close the tab.

Some players are already loaded and you can add more / delete them as you wish.

Inspired by the [original role picker](https://dreadhunger.azurewebsites.net/) from Crooker

## Building locally

- Clone the repository, then:

```
npm install
```

- Run development server with:

```
npm run dev
```

- You can also run the build and dev server in Docker container if you wish:

```
npm run docker
```
