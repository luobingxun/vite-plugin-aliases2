import { Plugin } from 'vite';
interface Options {
    prefix?: string;
    root?: string;
}
export default function createPlugin(options?: Options): Plugin;
export {};
