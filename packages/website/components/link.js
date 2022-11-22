import { defineComponent, html } from "../lib/tybalt-core/index.js";
import {
  compose,
  required,
  string,
  url,
} from "../lib/tybalt-validator/index.js";

defineComponent({
  name: "tybalt-link",
  template: html`<a href="${href}"><slot name="content">link</slot></a>`,
  shadowMode: "open",
  props: {
    href: {
      validator: compose(required(), string(), url()),
    },
  },
});
