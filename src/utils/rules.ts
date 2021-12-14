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
import { ESLintUtils } from "@typescript-eslint/experimental-utils";
import { version, repository } from "../../package.json";

const REPO_URL = repository.url.replace(/\.git$/, "");

export const createRule = ESLintUtils.RuleCreator((name) => {
  const ruleName = parsePath(name).name;

  return `${REPO_URL}/blob/v${version}/docs/rules/${ruleName}.md`;
});

export const camelCased = (s: string) =>
  s.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
