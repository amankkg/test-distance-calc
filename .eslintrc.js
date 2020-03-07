const blocksPadding = [
  // Always require blank lines after import
  {
    blankLine: 'always',
    prev: 'import',
    next: '*',
  },
  // Except between imports
  {
    blankLine: 'any',
    prev: 'import',
    next: 'import',
  },

  // Always require blank lines before and after every sequence of variable declarations and export
  {
    blankLine: 'always',
    prev: '*',
    next: ['const', 'let', 'export'],
  },
  {
    blankLine: 'always',
    prev: ['const', 'let', 'export'],
    next: '*',
  },
  {
    blankLine: 'any',
    prev: ['const', 'let', 'export'],
    next: ['const', 'let', 'export'],
  },

  // Always require blank lines before and after class declaration, if, do/while, switch, try
  {
    blankLine: 'always',
    prev: '*',
    next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'],
  },
  {
    blankLine: 'always',
    prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'],
    next: '*',
  },

  // Always require blank lines before return statements
  {
    blankLine: 'always',
    prev: '*',
    next: 'return',
  },
]

module.exports = {
  extends: 'react-app',
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/sort': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(api|components|pages|store)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.css$'],
        ],
      },
    ],
    'sort-imports': 'off',
    'import/order': 'off',
    'padding-line-between-statements': ['warn'].concat(blocksPadding),
  },
}
