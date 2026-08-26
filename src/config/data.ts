import { createListCollection } from "@chakra-ui/react";

import { PROPERTYTYPES, TRANSACTIONTYPES } from "./propertyOptions";

// Re-exported so existing UI imports keep working. Server modules should import
// from ./propertyOptions directly — this file builds a client-only collection.
export { PROPERTYTYPES, TRANSACTIONTYPES };

export const propertyTypesCollection = createListCollection({
  items: PROPERTYTYPES.map((type) => ({ label: type.label, value: type.value }))
});
