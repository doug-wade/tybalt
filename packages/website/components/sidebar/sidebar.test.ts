import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { mount } from '@tybalt/test-utils';
import { describe } from '@jest/globals';

import Sidebar from './sidebar.component';
import Link from '../link/link.component.ts';

const getNumberOfFilesInDirectory = async (pathFragment: string) => {
    const path = resolve(pathFragment);
    const files = await readdir(path);

    return files.length;
};

describe('sidebar', () => {
    it('has two uls for pages and guides', async () => {
        const wrapper = await mount(Sidebar);

        const aside = wrapper.find('aside');

        expect(aside.findAll('ul').length).toBe(2);
    });

    it('has lis for each of the pages and guides', async () => {
        const wrapper = await mount(Sidebar);

        const pageLis = await getNumberOfFilesInDirectory('guides');
        const guideLis = await getNumberOfFilesInDirectory('pages');

        const aside = wrapper.find('aside');

        expect(aside.findComponentAll(Link).length).toBe(pageLis + guideLis + 2);
    });
});