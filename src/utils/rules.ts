/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { parse as parsePath } from "path";
import { ESLintUtils, TSESLint } from "@typescript-eslint/experimental-utils";
import { version, repository } from "../../package.json";
import { RuleTester as DocRuleTester } from "eslint-docgen";

const REPO_URL = repository.url.replace(/\.git$/, "");

export const createRule = ESLintUtils.RuleCreator((name) => {
  const ruleName = parsePath(name).name;

  return `${REPO_URL}/blob/v${version}/docs/rules/${ruleName}.md`;
});

export const camelCased = (s: string) =>
  s.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });

// see https://github.com/wikimedia/eslint-docgen/issues/124
export class RuleTester extends DocRuleTester implements TSESLint.RuleTester {
  constructor(options: TSESLint.RuleTesterConfig) {
    super(options);
  }

  public run<TMessageIds extends string, TOptions extends readonly unknown[]>(
    ruleName: string,
    rule: TSESLint.RuleModule<TMessageIds, TOptions, TSESLint.RuleListener>,
    tests: TSESLint.RunTests<TMessageIds, TOptions>
  ): void {
    return super.run.call(this, ruleName, rule, tests);
  }
  public defineRule<
    TMessageIds extends string,
    TOptions extends readonly unknown[]
  >(
    name: string,
    rule:
      | TSESLint.RuleModule<TMessageIds, TOptions, TSESLint.RuleListener>
      | TSESLint.RuleCreateFunction<
          TMessageIds,
          TOptions,
          TSESLint.RuleListener
        >
  ): void {
    super.defineRule.call(this, name, rule);
  }
}
