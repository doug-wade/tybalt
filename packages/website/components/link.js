import { defineComponent } from "../lib/tybalt-core/index.js";
import { compose, required, string } from "../lib/tybalt-validator/index.js";

defineComponent({
  name: "tybalt-link",
  template: (href) => `<a href="${href}"><slot name="content">link</slot></a>`,
  shadowMode: "open",
  props: {
    href: {
      validator: compose(required(), string()),
    },
  },
});
