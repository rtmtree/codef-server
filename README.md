# CodeF Games server

Tech Stacks

- WebGL Games by Unity Engine
- NodeJS: javascript server environment https://nodejs.org
- Express: web application framework https://expressjs.com
- TypeScript: typed build on JavaScript https://www.typescriptlang.org/
- Husky: pre-commit hook https://typicode.github.io/husky/#/
- Docker: containerized service https://docs.docker.com/

---

### [Run project locally](docs/run-locally.md)

### [Run project prod](docs/run-prod.md)

### [Update public](docs/update-public.md)

---

### Setup dev environment

1. Enable pre-commit hook with husky

```zsh
yarn && yarn husky install
```

- **when commit, pre-commit hook will check code format and run all tests**
- **If code format is wrong or test not pass, commit will failed**

---

### Run test

1. run all test

```zsh
sh ./scripts/test-local.sh
```

2. run specific test

```zsh
cd ./<io-client or io-server>
```

- to run all test in dir

```zsh
yarn test
```

- to run all test in specific file

```zsh
yarn test <relative-path-to-file>
```

- to run test and persist test console

```zsh
yarn test --watchAll
```

---

### Format code

1. format code with prettier

```zsh
cd ./<io-client or io-server>
yarn format
```

2. check format code

```zsh
cd ./<io-client or io-server>
yarn lint
```
