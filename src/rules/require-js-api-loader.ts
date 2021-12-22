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

import { TSESTree } from "@typescript-eslint/experimental-utils";
import { createRule, camelCased } from "../utils/rules";

const matchesHostAndPath = (text: string): boolean =>
  /maps\.googleapis\.com\/maps\/api\/js/g.test(text);

export const messageId = camelCased(__filename);

const description = `Require usage of [@googlemaps/js-api-loader](https://goo.gle/32rqTXJ) to dynamically [load the Google Maps API](https://goo.gle/3qipAT3).`;

export default createRule({
  name: __filename,
  meta: {
    docs: {
      description,
      recommended: "warn",
    },
    messages: {
      [messageId]: description.split("\n")[0],
    },
    schema: [],
    type: "suggestion",
  },
  defaultOptions: [],
  create: (context) => {
    return {
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (
          node.left.type === "MemberExpression" &&
          node.left.object.type === "Identifier" &&
          node.left.object.name === "script" &&
          node.left.property.type === "Identifier" &&
          node.left.property.name === "src" &&
          node.right.type === "Literal" &&
          typeof node.right.value === "string" &&
          matchesHostAndPath(node.right.value)
        ) {
          context.report({
            node,
            messageId,
          });
        }
      },
      Literal(node: TSESTree.Literal) {
        if (node.value && matchesHostAndPath(node.value.toString())) {
          context.report({
            node,
            messageId,
          });
        }
      },
    };
  },
});
