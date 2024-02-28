# jsbook

### Based on Stephen Grider's React and TypeScript

#### What it is:

This is a multi-part project server-client application that allows editing, running, and sharing code and text documents via a web browser.

The project components include:

- Web app - allows editing and running of JavaScript and React code and text cells (collectively known as a 'book');
- CLI - command line utility to launch the local API
- Local API - serves up local web client as well as loading and saving of files to local computer.
- Public API (TBD) - serves public web client and allows transfer of code/text books to and from local APIs.

#### Built with:

- React
- TypeScript
- axios - simplifies http request
- localForage - provides fast, simple, async storage using IndexedDB
- esbuild - in-browser bundler of JavaScript/TypeScript, CSS, modules and more
- unpkg.com - a global CDN containing every npm package. Allows loading of any file in a package - npm.com CORS policy will not allow individual file downloads
- redux for state management
- redux-thunk for async action creators
- custom esbuild plugin - fetches all files for an npm package from unpkg.com (need because by default esbuild will try to import from filesystem (which doesn't exist in browser))
- Lerna CLI to manage multi-package project

Todo:

1. latest esbuild might be able to bundle css into main file so no hack required?
2. add last browser resize tweak - sync width state between ResizableContainer and ResizableBox
3. add code execution delay to allow time to update html - #172
4. migrate redux code to use RTK as per latest redux version/docs - createStore is deprecated so use configureStore, thunk is built-in to RTK
5. extract action creators into individual files

redux implementation:

- action types are enum constants for action-types
- actions are type interfaces for action creator
- action creators are the logic to create actions that can be dispatched
- reducer accepts state and actions and mutate and return state
- dispatch function is a store method used to send actions to the store
- store is the data
- selectors accept store state as input and return derived data
  useTypedSelector is used to use redux selectors with redux
- vodka is used to alleviate the pain from using redux

review:

- async action creator returns a promise
