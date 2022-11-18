import { defineComponent } from "../lib/gambit-core/index.js";

defineComponent({
  name: "gambit-code-block",
  template: "<code><slot>code goes here</slot></code>",
});
