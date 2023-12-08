import { defineComponent, html } from '@tybalt/core';
import { BehaviorSubject } from 'rxjs';

import css from './brewery-search.css';

const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

export default defineComponent({
    name: 'example-brewery-search',
    css,
    setup() {
        const city = new BehaviorSubject('');
        const cities = new BehaviorSubject([]);
        const loading = new BehaviorSubject(false);

        const clickHandler = async () => {
            loading.next(true);

            const results = await fetch(`${BASE_URL}?by_city=${city.value}`);
            const json = await results.json();
            cities.next(json);

            loading.next(false);
        };

        const changeHandler = (evt: Event) => {
            city.next(evt.target?.value);
        };

        return {
            changeHandler,
            clickHandler,
            city,
            cities,
            loading
        }
    },
    render({ city, cities, changeHandler, clickHandler, loading }) {
        return html`
            <div class="brewery-search">
                ${loading ? html`<div>Searching for city ${city}</div>` : ''}
                <ul>
                    ${cities.map(localCity => html`<li><a href="${localCity.website_url}">${localCity.name}</a></li>`)}
                </ul>
                <label>
                    <span>City name</span>
                    <input type="text" @change="${changeHandler}" value="${city}"></input>
                </label>
                <example-button @click="${clickHandler}">Search</example-button>
            </div>
        `;
    },
});
