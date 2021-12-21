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

import placeFields, { messageId } from "./place-fields";
import { espreeParser } from "../utils/parser";
import { RuleTester } from "../utils/rules";

new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
  },
  parser: espreeParser,
}).run("place-fields", placeFields, {
  valid: [
    `const service = new google.maps.places.PlacesService();
const request = {place_id: 'foo', fields: ['place_id']};
service.getDetails(request)`,
    `const service = new google.maps.places.PlacesService();
service.getDetails({place_id: 'foo', fields: ['place_id']})`,
    `const service = new google.maps.places.PlacesService();
service.getDetails({...{place_id: 'foo', fields: ['place_id']}})`,
    `const service = new google.maps.places.PlacesService();
service.getDetails({...{place_id: 'foo', 'fields': ['place_id']}})`,
    // currently do no support computed properties
    `const service = new google.maps.places.PlacesService();
const buildRequest = () => {};
service.getDetails(buildRequest())`,
    // Autocomplete
    `const service = new google.maps.places.Autocomplete(null, {fields: ['place_id']});`,
  ],
  invalid: [
    // getDetails
    {
      code: `const service = new google.maps.places.PlacesService();
const request = {place_id: 'foo'};
service.getDetails(request)`,
      errors: [{ messageId }],
    },
    {
      code: `const service = new google.maps.places.PlacesService();
    service.getDetails({})`,
      errors: [{ messageId }],
    },
    {
      code: `const service = new google.maps.places.PlacesService();
service.getDetails({...{bar: 'foo'}})`,
      errors: [{ messageId }],
    },
    // Autocomplete
    {
      code: `const service = new google.maps.places.Autocomplete(null, {});`,
      errors: [{ messageId }],
    },
    {
      code: `const service = new google.maps.places.Autocomplete(null);`,
      errors: [{ messageId }],
    },
  ],
});
