import { array, compose, required } from "@tybalt/validate";
import { defineComponent } from "@tybalt/core";

export default defineComponent({
    name: "tybalt-link-list",
    props: {
        links: {
            validator: compose(array(), required()),
        }
    }
});