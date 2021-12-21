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

const matchesApiKey = (text: string): boolean =>
  /AIza[0-9A-Za-z\\-_]{35}/g.test(text);

export const messageId = camelCased(__filename);

const description = `Avoid placing API keys in source code. Instead use build tools that insert the API key using environment variables similar to:

\`\`\`js
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
\`\`\`

This pattern enables use of development keys and prevents use of production keys that may have higher quotas.
`;

export default createRule({
  name: __filename,
  meta: {
    docs: {
      description,
      recommended: "warn",
    },
    messages: {
      [messageId]: "Avoid placing API keys in source code.",
    },
    schema: [],
    type: "suggestion",
  },
  defaultOptions: [],
  create: (context) => {
    return {
      Literal(node: TSESTree.Literal) {
        if (node.value && matchesApiKey(node.value.toString())) {
          context.report({
            node,
            messageId,
          });
        }
      },
    };
  },
});
