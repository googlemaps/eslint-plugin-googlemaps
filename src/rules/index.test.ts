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

import { existsSync } from "fs";
import { resolve } from "path";
import plugin from "../";

const ruleNamePrefix = "googlemaps/";
const ruleNames = Object.keys(plugin.rules);

describe("rules", () => {
  test.skip.each(ruleNames)(
    "should have a corresponding doc for %s",
    (rule) => {
      const docPath = resolve(__dirname, "../../docs/rules", `${rule}.md`);

      expect(existsSync(docPath)).toBeTruthy();
    }
  );

  test.each(ruleNames)("should have a corresponding test for %s", (rule) => {
    const testPath = resolve(__dirname, "../rules/", `${rule}.test.ts`);

    expect(existsSync(testPath)).toBeTruthy();
  });

  it("should export configs that refer to actual rules", () => {
    const { rules } = plugin.configs.recommended;

    // @ts-ignore
    Object.keys(rules).forEach((rule: string) => {
      const ruleName = rule.slice(ruleNamePrefix.length);

      expect(rule.startsWith(ruleNamePrefix)).toBe(true);
      expect(ruleNames).toContain(ruleName);
      expect(() => require(`../rules/${ruleName}`)).not.toThrow();
    });
  });
});
