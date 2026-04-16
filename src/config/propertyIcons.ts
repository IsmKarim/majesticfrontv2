export const PROPERTYICONS = {
    transactionType: "icon-park-solid:transaction",
    propertyType: "mdi:home-outline",
    price: "solar:tag-price-bold",
    totalArea: "lsicon:measure-outline",
    bedrooms: "material-symbols:bed-outline",
    bathrooms: "solar:bath-line-duotone",
    parkingSpaces: "iconoir:car",
    isFurnished: "mdi:sofa",
    city: "ion:location-outline",
    buildingAge: "lucide:building",
    orientation: "mdi:compass-outline",
    floorNumber: "bi:building",
    syndicateFees: "material-symbols:concierge-outline",
    hasBasement: "lsicon:park-outline",
    hasSecurity: "fluent:video-security-24-regular" , 
    hasBalcony: "iconoir:balcony",
    hasTerrace: "hugeicons:terrace",
    hasElevator: "material-symbols-light:elevator-outline",
    hasAirConditioning: "cbi:air-conditioner",
    hasPool: "cil:pool",
    hasEquippedKitchen: "emojione-monotone:kitchen-knife",
    hasEasyAccess: "mdi:wheelchair",
    hasGarden: "maki:garden",
    hasOceanView: "mdi:ocean",
}


export const PropertyFeatures = [
    {
        name : "Sous-sol",  
        icon : "lsicon:park-outline",
        accessor : "hasBasement"
    } ,
    {
        name : "Securisé",  
        icon : "fluent:video-security-24-regular",
        accessor : "hasSecurity"
    } ,{
        name : "Balcon",  
        icon : "iconoir:balcony",
        accessor : "hasBalcony"
    } ,{
        name : "Terrasse",  
        icon : "hugeicons:terrace",
        accessor : "hasTerrace"
    } ,{
        name : "Ascenseur",  
        icon : "material-symbols-light:elevator-outline",
        accessor : "hasElevator"
    } ,
    {
        name : "Climatisation",  
        icon : "cbi:air-conditioner",
        accessor : "hasAirConditioning"
    } ,{
        name : "Piscine",
        icon : "cil:pool",
        accessor : "hasPool"
    } ,{
        name : "Cuisine équipée",
        icon : "emojione-monotone:kitchen-knife",
        accessor : "hasEquippedKitchen"
    } ,{
        name : "Accès facile",
        icon : "mdi:wheelchair",
        accessor : "hasEasyAccess"
    } ,{
        name : "Vue sur mer",
        icon : "mdi:ocean",
        accessor : "hasOceanView"
    }   , 
    {
        name : "Jardin",
        icon : "maki:garden",
        accessor : "hasGarden"
    }   , 
    

]