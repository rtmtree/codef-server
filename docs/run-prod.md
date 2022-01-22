### Run production build with Docker compose

1. open docker desktop

```zsh
open -a Docker
```

2. spin everything up

```zsh
docker-compose up
```

3. Terminate everything

```zsh
docker-compose down -v --rmi local
```

### Troubleshoot

1. If changed in code apply, require `--build` to rebuild docker image

```zsh
docker-compose up --build
```
