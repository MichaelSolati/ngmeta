import copier from 'rollup-plugin-copier';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const copy = copier({
  items: [
    {
      src: 'src/ngmeta.types.ts',
      dest: 'dist/ngmeta.types.ts',
      createPath: true,
    },
  ],
});

/**
 * 
 * @param {*} warning 
 * @param {*} rollupWarn 
 */
const onwarn = (warning, rollupWarn) => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    rollupWarn(warning);
  }
};

const plugins = [
  typescript({
    tsconfig: 'tsconfig.json',
    tsconfigOverride: {
      compilerOptions: {
        module: 'ESNext',
      },
    },
  }),
  copy,
];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins,
    onwarn,
  }
];