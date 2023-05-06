import { unthunk } from "./mod.ts";

Deno.bench(function unthunkEmpty() {
  const test = unthunk({
    random: () => Math.random(),
  });
});

Deno.bench(function unthunkSmall() {
  const test = unthunk({
    random: () => Math.random(),
  });
  test.random;
});

const testSmallGet = unthunk({
  static: "static",
  random: () => Math.random(),
});

Deno.bench(function unthunkSmallGet() {
  testSmallGet.random;
});

Deno.bench(function unthunkSmallMiss() {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  testSmallGet.random2;
});

Deno.bench(function unthunkSmallGetValue() {
  testSmallGet.static;
});

Deno.bench(function unthunkNoCache() {
  const random = () => Math.random();
  random();
});

Deno.bench(function unthunkCreateNoCache() {
  const test = unthunk({
    random: () => () => Math.random(),
  });
  test.random();
});

function initializer() {
  return new Date();
}

const testWorthIt = unthunk({
  random: () => initializer(),
});

Deno.bench(function unthunkWorthIt() {
  testWorthIt.random;
});

Deno.bench(function unthunkWorthIt() {
  initializer();
});

function initializer2() {
  return Math.random();
}

const testNotWorthIt = unthunk({
  random: () => initializer2(),
});

Deno.bench(function unthunkNotWorthIt() {
  testNotWorthIt.random;
});

Deno.bench(function unthunkNotWorthIt() {
  initializer2();
});
