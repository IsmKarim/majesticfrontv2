/**
 * Plain option data, free of any UI dependency.
 *
 * Kept separate from `data.ts` because that module calls Chakra's
 * `createListCollection()` at module scope, which is client-only. The query
 * schema and the service layer both need these values on the server, so they
 * import from here instead.
 */

export const PROPERTYTYPES = [
    { value: 'villa', label: 'Villa' },
    { value: 'appartment', label: 'Appartment' },
    { value: 'house', label: 'Maison et Duplex' },
    { value: 'land', label: 'Terrain' },
    { value: 'commercial', label: 'Magasin Commercial' },
    { value: 'business', label: 'Bureau et Plateau' },
    { value: 'other', label: 'Autre' },
] as const;

export const TRANSACTIONTYPES = [
    { value: 'sale', label: 'Vente' },
    { value: 'rent', label: 'Location' },
    { value: 'shortlet', label: 'Location de Vacances' },
] as const;
