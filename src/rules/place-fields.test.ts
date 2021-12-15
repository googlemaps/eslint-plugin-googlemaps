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
import placeFields, { messageId } from "./place-fields";
import { espreeParser } from "../utils/parser";

new TSESLint.RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
  },
  parser: espreeParser,
}).run("place-fields", placeFields, {
  valid: [
    `const service = new google.maps.places.PlacesService();
const request = {place_id: 'foo', fields: ['place_id']};
service.getDetails(request)`,
  ],
  invalid: [
    {
      code: `const service = new google.maps.places.PlacesService();
const request = {place_id: 'foo'};
service.getDetails(request)`,
      errors: [{ messageId }],
    },
  ],
});
