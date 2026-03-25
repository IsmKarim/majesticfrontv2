import { Tabs } from "@chakra-ui/react";



export default function SearchTabs() {


    return (
        <Tabs.Root defaultValue="all" color="white" >
            <Tabs.List gap={1} >
                <Tabs.Trigger value="all" bg="brand.500" color="white">
                    Tous
                </Tabs.Trigger>
                <Tabs.Trigger value="buy" bg="brand.500" color="white">
                    Acheter
                </Tabs.Trigger>
                <Tabs.Trigger value="rent" bg="brand.500" color="white">
                    Louer
                </Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>
    );
}