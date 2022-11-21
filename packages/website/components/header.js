import { defineComponent } from "../lib/tybalt-core/index.js";

defineComponent({
  name: "tybalt-header",
  template: `
    <nav>
      <span>Tybalt Web Components</span>
      <span>
        <a href="https://github.com/doug-wade/tybalt">Github</a>
      </span>
    </nav>
  `,
  css: `
    nav {
      display: flex;
      justify-content: space-between;
    }
  `,
});
