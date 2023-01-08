import { defineComponent, html } from '@tybalt/core';
import { compose, string, required } from '@tybalt/validator';

export default defineComponent({
    name: 'example-youtube-embed',
    shadowMode: 'open',
    props: {
        youtubeId: {
            validator: compose(required(), string()),
            default: '1RlI-JxwPNk',
        },
    },
    render({ youtubeId }: { youtubeId: string }) {
        return html`
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/${youtubeId}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        `;
    },
});
