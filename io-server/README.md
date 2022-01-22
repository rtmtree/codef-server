# CodeF Games server

Tech Stacks

- WebGL Games by Unity Engine
- NodeJS: javascript server environment https://nodejs.org
- Express: web application framework https://expressjs.com
- TypeScript: typed build on JavaScript https://www.typescriptlang.org/

Noted

- **when commit, pre-commit hook will check code format and run all tests**
- **If code format is wrong or test not pass, commit will failed**

---

## Run project locally

1. install dependencies

```zsh
yarn
```

2. run project locally

```zsh
yarn start
```

3. open http://localhost:3000 to access the game
4. open http://localhost:3000/api/health to check health of the server

---

## Run test

1. run all test

```zsh
yarn test
```

2. run specific test

```zsh
yarn test <path-to-test-file>
```

---

## Format code

1. format code with prettier

```zsh
yarn format
```

2. check format code

```zsh
yarn lint
```
