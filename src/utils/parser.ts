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

// see https://github.com/jest-community/eslint-plugin-jest/blob/v25.2.2/src/rules/__tests__/test-utils.ts
import { createRequire } from "module";

const r = createRequire(__filename);
const eslintRequire = createRequire(r.resolve("eslint"));
export const espreeParser = eslintRequire.resolve("espree");
