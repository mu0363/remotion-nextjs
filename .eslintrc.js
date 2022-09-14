module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    // "standard",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.{ts,tsx}"], // Your TypeScript files extension
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        // "plugin:@remotion/recommended",
      ],
      parserOptions: { project: ["./tsconfig.json"] }, // Specify it only for TypeScript files
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      typescript: {},
      node: { extensions: [".ts"] },
    },
  },
  plugins: ["react", "@typescript-eslint", "tailwindcss", "import", "unused-imports", "import-access"],
  rules: {
    "require-jsdoc": "off",
    "sort-imports": 0,
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/naming-convention": [
      "error",
      { selector: "typeAlias", format: ["PascalCase"] },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "should", "has"],
      },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "no-console": ["error", { allow: ["warn", "info", "error"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "import/named": "off",
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: false,
        checkLocalVariables: true,
        checkInlineFunction: true,
      },
    ],
    "import-access/jsdoc": ["error"],
    "import/order": [
      "error",
      {
        // グループごとの並び順
        groups: [
          "builtin", // 1. fsや path などの node "builtin" のモジュール
          "external", // 2. npm install したパッケージ
          "internal", // 3. webpack などでパス設定したモジュール
          ["parent", "sibling"], // 4. 親階層と小階層のファイル
          "object", // object"-imports
          "type", // 型だけをインポートする type imports
          "index", // 同階層のファイル
        ],
        // グループごとに改行を入れる
        // "newlines-between": "always", // "never" を指定すると改行なし
        // FIXME: ちょっとよく分かってない
        // This defines import types that are not handled by configured pathGroups. This is mostly needed when you want to handle path groups that look like external imports.
        pathGroupsExcludedImportTypes: ["builtin"],
        // アルファベット順・大文字小文字を区別しない
        alphabetize: { order: "asc", caseInsensitive: true },
        // パターンマッチしたものをグループにする
        // "newlines-between": "always" の場合は pathGroups  ごとに空行が入る
        pathGroups: [
          // react 関連を external より前にする
          // "pathGroupsExcludedImportTypes": ["react"], にしてみたが `react`, `react-dom` などが別グループになってしまったので pattern で無理やり同じグループにした
          // {
          //   pattern: "react**",
          //   group: "external",
          //   position: "before",
          // },
          // `@/app`, `@/features/`, `@/libs` の import をひとグループにして internal の前に
          {
            pattern: "{@/app/**,@/features/**,@/libs/**}",
            group: "internal",
            position: "before",
          },
          // `@/components`, `@/pages` の import をグルーピング
          {
            pattern: "{@/components/**,@/pages/**}",
            group: "internal",
            position: "before",
          },
          // CSS module を一番最後に
          {
            pattern: "./**.module.css",
            group: "index",
            position: "after",
          },
        ],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    // FIXME:
    // https://github.com/typescript-eslint/typescript-eslint/issues/4619
    "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
  },
};
