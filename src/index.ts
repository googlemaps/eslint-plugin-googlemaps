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

import { TSESLint } from "@typescript-eslint/experimental-utils";
import noApiKeys from "./rules/no-api-keys";
import { recommended } from "./configs/recommended";

const rules: { [rule: string]: TSESLint.RuleModule<string, unknown[]> } = {
  "no-api-keys": noApiKeys,
};

const configuration = {
  rules,
  configs: {
    recommended,
  },
};

export default configuration;
module.exports = configuration;
