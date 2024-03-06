import fs from 'node:fs/promises';
import path from 'node:path';

const defaultOptions = {
    prefix: '@',
    root: 'src'
};
function createPlugin(options = defaultOptions) {
    const { prefix, root } = options;
    return {
        name: 'vite-plugin-aliases',
        async config() {
            const aliasesMap = await composeAliasesMap(root);
            const aliases = decorativePrefix(prefix, aliasesMap);
            return {
                resolve: { alias: aliases }
            };
        }
    };
}
async function composeAliasesMap(root) {
    root = path.resolve(process.cwd(), root);
    const fileArr = await fs.readdir(root);
    const dirMap = {};
    for (const dir of fileArr) {
        const stat = await fs.stat(`${root}/${dir}`);
        if (stat.isDirectory()) {
            dirMap[dir] = path.join(root, dir);
        }
    }
    return dirMap;
}
function decorativePrefix(prefix, aliasesMap) {
    const prefixAliases = Object.entries(aliasesMap).map(([key, value]) => ({
        [`${prefix}${key}`]: value
    }));
    return prefixAliases.reduce((acc, cur) => ({ ...acc, ...cur }), {});
}

export { createPlugin as default };
