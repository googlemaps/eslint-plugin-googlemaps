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

import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";
import { Reference } from "@typescript-eslint/scope-manager";
import { createRule, camelCased } from "../utils/rules";

export const messageId = camelCased(__filename);

const description = `Use the \`fields\` option to limit the fields returned by the API and costs. Requests to the Places API are billed by the fields that are returned. See [Places Data SKUs](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#data-skus) for more details.

More information about fields for specific API calls can be found at the following links:

- [Place Details fields guidance](https://goo.gle/3H0TxxG)
- [Place Autocomplete fields guidance](https://goo.gle/3sp2XyS)

> **Note**: This rule is not exhaustive. For example, it ignores \`Autocomplete.setFields()\`.`;

export default createRule({
  name: __filename,
  meta: {
    docs: {
      description,
      recommended: false,
    },
    messages: {
      [messageId]:
        "Use the `fields` option to limit the fields returned by the API and costs.",
    },
    schema: [],
    type: "suggestion",
    fixable: "code",
  },
  defaultOptions: [],
  create: (context) => {
    return {
      NewExpression: (node: TSESTree.NewExpression): void => {
        try {
          if (
            fullNamespace(node.callee).match(
              /google\.maps\.places\.Autocomplete$/
            )
          ) {
            const references = context.getScope().references;
            const options = node.arguments[1];

            if (objectMaybeHasKey(references, options) === Ternary.FALSE) {
              context.report({
                messageId,
                node: options || node,
              });
            }
          }
        } catch (e) {
          console.warn(`rule googlemaps/${__filename} failed with: ${e}`);
        }
      },
      MemberExpression: (node: TSESTree.MemberExpression): void => {
        try {
          if (
            node.property.type === "Identifier" &&
            node.property.name === "getDetails"
          ) {
            if (node.object.type === "Identifier") {
              const references = context.getScope().references;

              const name = node.object.name;

              const service = getReference(references, name);

              if (
                service &&
                service.writeExpr &&
                service.writeExpr.type === "NewExpression"
              ) {
                if (
                  fullNamespace(service.writeExpr.callee).match(
                    /google\.maps\.places\.PlacesService/
                  )
                ) {
                  const parent = node.parent;
                  if (parent && parent.type === "CallExpression") {
                    const requestArgument = parent.arguments[0];

                    if (
                      objectMaybeHasKey(references, requestArgument) ===
                      Ternary.FALSE
                    ) {
                      context.report({
                        messageId,
                        node: node.property,
                        fix:
                          requestArgument.type === "ObjectExpression"
                            ? (fixer: TSESLint.RuleFixer) => {
                                return [
                                  fixer.insertTextBefore(
                                    context
                                      .getSourceCode()
                                      .getTokens(requestArgument)[1],
                                    `fields: /** TODO: Add necessary fields to the request */ [], `
                                  ),
                                ];
                              }
                            : null,
                      });
                    }
                  }
                }
              }
            }
          }
        } catch (e) {
          console.warn(`rule googlemaps/${__filename} failed with: ${e}`);
        }
      },
    };
  },
});

const fullNamespace = (node: TSESTree.Node): string => {
  if (isIdentifier(node)) {
    return node.name;
  }
  if (isMemberExpression(node)) {
    if (node.object.type === "Identifier") {
      return [node.object.name, fullNamespace(node.property)].join(".");
    } else if (node.object.type === "MemberExpression") {
      return [fullNamespace(node.object), fullNamespace(node.property)].join(
        "."
      );
    }
  }

  return "";
};

const isIdentifier = (
  node: TSESTree.Node | null | undefined
): node is TSESTree.Identifier => {
  return node != null && node.type === "Identifier";
};

const isLiteral = (
  node: TSESTree.Node | null | undefined
): node is TSESTree.Literal => {
  return node != null && node.type === "Literal";
};

const isMemberExpression = (
  node: TSESTree.Node | null | undefined
): node is TSESTree.MemberExpression => {
  return node != null && node.type === "MemberExpression";
};

const getReference = (
  references: Reference[],
  name: string
): Reference | undefined => {
  return references.find(({ identifier }) => identifier.name === name);
};

enum Ternary {
  TRUE,
  FALSE,
  UNKNOWN,
}

const objectMaybeHasKey = (
  references: Reference[],
  obj?: TSESTree.Node | null
): Ternary => {
  if (!obj) {
    return Ternary.FALSE;
  }

  switch (obj.type) {
    case "Identifier": {
      const resolved = getReference(references, obj.name);

      if (!resolved) {
        return Ternary.UNKNOWN;
      }

      return objectMaybeHasKey(references, resolved.writeExpr);
    }
    case "ObjectExpression": {
      const properties = obj.properties.map((property) => {
        switch (property.type) {
          case "Property": {
            if (isIdentifier(property.key)) {
              if (property.key.name === "fields") {
                return Ternary.TRUE;
              }
              return Ternary.FALSE;
            }

            if (isLiteral(property.key)) {
              if (property.key.value === "fields") {
                return Ternary.TRUE;
              }
              return Ternary.FALSE;
            }

            return Ternary.UNKNOWN;
          }
          case "SpreadElement": {
            return objectMaybeHasKey(references, property.argument);
          }
          default: {
            return Ternary.UNKNOWN;
          }
        }
      });

      // if at least one Ternary.TRUE
      if (properties.includes(Ternary.TRUE)) {
        return Ternary.TRUE;
      }

      // if all are Ternary.FALSE, we can be certain it is missing
      if (
        properties.filter((t) => t === Ternary.FALSE).length ===
        properties.length
      ) {
        return Ternary.FALSE;
      }

      // fallback to Ternary.Unknown
      return Ternary.UNKNOWN;
    }
    default:
      return Ternary.UNKNOWN;
  }
};
