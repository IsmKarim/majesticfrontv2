import { createListCollection } from "@chakra-ui/react";



export const PROPERTYTYPES =[
    { value: 'villa', label: 'Villa' },
    { value: 'appartment', label: 'Appartment' },
    { value: 'house', label: 'Maison et Duplex' },
    { value: 'land', label: 'Terrain' },
    { value: 'commercial', label: 'Magasin Commercial' },
    { value: 'business', label: 'Bureau et Plateau' },
    { value: 'other', label: 'Autre' },
]


export const TRANSACTIONTYPES =[
    { value: 'sale', label: 'Vente' },
    { value: 'rent', label: 'Location' },
    { value: 'shortlet', label: 'Location de Vacances' },
]

export const propertyTypesCollection = createListCollection({
  items: PROPERTYTYPES.map((type) => ({ label: type.label, value: type.value }))
});