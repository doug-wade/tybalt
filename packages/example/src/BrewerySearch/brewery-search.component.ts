import { defineComponent, html } from '@tybalt/core';
import { derive, reactive } from '@tybalt/reactive';

import css from './brewery-search.css';

const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

export default defineComponent({
    name: 'example-brewery-search',
    css,
    setup() {
        const city = reactive('');
        const cities = reactive([]);
        const loading = reactive(false);

        const clickHandler = async () => {
            loading.value = true;

            const results = await fetch(`${BASE_URL}?by_city=${city.value}`);
            const json = await results.json();
            cities.value = json;

            loading.value = false;
        };

        const inputHandler = (evt: Event) => {
            city.value = evt.target?.value;
        };

        const loadingMessage = derive(loading, ([value]) => {
            if (value) {
                return html`<div>Searching for ${city.value}...</div>`;
            } else {
                return '';
            }
        });

        const citiesList = derive(cities, ([value]) => {
            if (cities.length) {
                const lis = value.map(
                    (localCity) => html`
                        <li>
                            <a href="${localCity.website_url}">${localCity.name}</a>
                        </li>
                    `,
                );
                return html`
                    <ul>
                        ${lis}
                    </ul>
                `;
            } else {
                return '';
            }
        });

        return {
            inputHandler,
            clickHandler,
            city,
            citiesList,
            loadingMessage,
        };
    },
    render({ city, citiesList, inputHandler, clickHandler, loadingMessage }) {
        return html`
            <div class="brewery-search">
                ${loadingMessage}
                ${citiesList}
                <label>
                    <span>City name</span>
                    <input type="text" @input="${inputHandler}" value="${city}"></input>
                </label>
                <example-button @click="${clickHandler}">Search</example-button>
            </div>
        `;
    },
});
