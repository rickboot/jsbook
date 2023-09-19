import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      //* Handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
        return { path: args.path, namespace: 'a' };
      });

      //* Handle relative paths in file
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
          namespace: 'a',
        };
      });

      //* Handle main file of an external module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });
    },
  };
};
