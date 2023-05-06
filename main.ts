import { unthunk } from "./mod.ts";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const test = unthunk({
    random: () => {
      console.log("random called");
      return Math.random();
    },
    fetch: async () => {
      console.log("fetch called");
      await new Promise((resolve) => setTimeout(resolve, 300));
      console.log("fetch resolved");
      return await Promise.resolve("fetch random: " + test.random);
    },
  });
  console.log("random 1", test.random);
  console.log("random 2", test.random);
  console.log("fetch 1", await test.fetch);
  console.log("fetch 2", await test.fetch);
}
