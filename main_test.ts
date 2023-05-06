import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { unthunk } from "./mod.ts";

Deno.test(function addTest() {
  const test = unthunk({
    random: () => {
      console.log("random called");
      return Math.random();
    },
  });
  assertEquals(test.random, test.random);
});
