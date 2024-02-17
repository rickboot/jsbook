# jsbook

### Based on Stephen Grider's React and TypeScript

#### Built with:

- React
- TypeScript
- axios - simplifies http request
- localForage - provides fast, simple, async storage using IndexedDB
- esbuild - in-browser bundler of JavaScript/TypeScript, CSS, modules and more
- unpkg.com - a global CDN containing every npm package. Allows loading of any file in a package - npm.com CORS policy will not allow individual file downloads

- custom esbuild plugin - fetches all files for an npm package from unpkg.com (need because by default esbuild will try to import from filesystem (which doesn't exist in browser))

Todo:

1. latest esbuild might be able to bundle css into main file so no hack required?
2. add last browser resize tweak - sync width state between ResizableContainer and ResizableBox
3. add code execution delay to allow time to update html - #172
