## **Blockchain voting system backend - Getting started**

1. Clone the project `git clone https://github.com/cs-fedy/blockchain-vote-system.git`
2. Change the directory to the project `cd blockchain-vote-system/backend`
3. Run `docker compose up -d` to start the containers.
4. If not working with node as a container then install yarn: `npm i -g yarn`
5. Install all the dependencies `yarn install`
6. Run the system in a dev env: `yarn run dev`

<span style="color:red; font-weight: 900">Docker must be installed to execute the code: <a href="https://www.docker.com/">DOCKER</a></span>

**Husky hooks:**

- Pre-commit: `yarn husky add .husky/pre-commit "yarn lint-staged"`
- Pre-push: `yarn husky add .husky/pre-push "yarn build"`

Checking the code takes time, even more so when the project gets bigger sometimes changing only markdown files or CI yaml files, doesn't require the typescript code to be checked. [Lint staged](https://github.com/okonet/lint-staged), goal is to only run your lint scripts when necessary, and only on the necessary files.

## **Used technologies**

- [express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [Typescript](https://www.typescriptlang.org/): TypeScript is JavaScript with syntax for types.
