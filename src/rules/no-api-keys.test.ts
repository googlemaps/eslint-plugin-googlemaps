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

import noApiKeys, { messageId } from "./no-api-keys";
import { espreeParser } from "../utils/parser";
import { RuleTester } from "../utils/rules";

new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
  },
  parser: espreeParser,
}).run("no-api-keys", noApiKeys, {
  valid: [
    "const apiKey = process.env.GOOGLE_MAPS_API_KEY;",
    'const apiKey = "YOUR_API_KEY";',
    'const apiKey = "AIzaSomeStringThatDoesntMatch";',
  ],
  invalid: [
    {
      code: 'const apiKey = "AIza00000000000000000000000000000000000";',
      errors: [{ messageId }],
    },
  ],
});
