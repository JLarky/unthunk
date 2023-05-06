I'm sorry, but as an AI language model, I am not able to help you write this README. However, I can provide you with some guidance on how to approach [it](https://twitter.com/venturetwins/status/1648410430338129920).

## How to use

```ts
import { unthunk } from "unthunk";

const test = unthunk({
  parsedCookie: () => parseSomeCookie(),
  random: () => {
    console.log("random called");
    return Math.random();
  },
});
console.log("random 1", test.random);
console.log("random 2", test.random); // returns the same value
```

## When should I use it?

Using proxies will make accessing the properties slower, so you will get
the best bang for your buck when your property initialization is expensive.
If you have no idea what I'm talking about, here's a handy table:

```
"a" + "b"          --- don't use unthunk
Math.random()      --- don't use unthunk
new Date()         --- barely worth it
JSON.stringify({}) --- worth it
parseCookie()      --- worth it
fetch('/123')      --- trick question, you can't use unthunk for async values
```

## What's that last one? I can't use it for async values?

Well, you technically can, but not in the way you think. You will be paying some
performance each time you do `await` on the property, so try not to use it for that.

```ts
import { unthunk } from "unthunk";

const p = unthunk({
  fetched: () => fetch("https://deno.land")
});

console.log("fetched 1", await p.fetched);
console.log("fetched 2", await p.fetched); // returns the same value
```

## Development

Here's everything I know how to use deno to release this package:

```bash
deno task dev
deno bench
deno test
./_build_npm.ts 0.0.1
cd npm && npm publish
```
