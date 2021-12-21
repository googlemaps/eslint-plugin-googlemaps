module.exports = {
  docPath: "docs/rules/{name}.md",
  rulePath: "src/rules/{name}.ts",
  testPath: "src/rules/{name}.test.ts",
  // fixCodeExamples doesn't work with ESLint 8.0.0 https://github.com/wikimedia/eslint-docgen/issues/126
  fixCodeExamples: false,
};
