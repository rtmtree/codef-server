### Update public file

1. After update public contents, update endpoint to 'http://localhost:3000' in the following files

- `io-client/public/client.js`

```js
var socket = io('http://localhost:3000') || {}
```

- `io-client/public/index.html`

```html
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
```
