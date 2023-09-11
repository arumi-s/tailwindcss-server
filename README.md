# tailwindcss-server

This package aims to be a standalone method for non-nodejs applications to scan and build css with any html input using [tailwindcss](https://tailwindcss.com).

## Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

To build (for using with bun):

```console
$ bun run build:bun
$ bun ./bin/index.js
```

To build (for using with nodejs):

```console
$ bun run build:node
$ node ./bin/index.js
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Usage

### Cli Mode

```console
$ cat 'some_html_file.html' | bun start --preflight=false --scope='.tw' --base-layer=true --components-layer=true --utilities-layer=true
.tw *,.tw :after,.tw :before{--tw-border-spacing-x:0;--tw-border-spacing-y:0; ... omitted ... }
```

This mode can be some what slow because v8 compiler does not have enough time to optimize the code on the fly.

### Server Mode

```console
$ bun start --port=3000 --hostname='localhost'
listening on localhost:3000
```

or

```console
$ bun start --unix='/tmp/server.sock'
listening on /tmp/server.sock
```

Make a `POST` request to get the result.

```console
$ curl 'localhost:3000/?preflight=false&scope=.tw' --data '@some_html_file.html'
.tw *,.tw :after,.tw :before{--tw-border-spacing-x:0;--tw-border-spacing-y:0; ... omitted ... }
```

## Known issues

- Script `build:bin` not working according to [github issue](https://github.com/oven-sh/bun/issues/4918).
- Unable to change theme and other [tailwindcss configurations](https://tailwindcss.com/docs/configuration).
