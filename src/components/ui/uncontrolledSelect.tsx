import { Portal, Select } from "@chakra-ui/react";

export default function UncontrolledSelect({ collection , placeholder  }) {
    return (
        <Select.Root collection={collection} >
            <Select.HiddenSelect />
            <Select.Control bg="transparent" border="none" outline="none" color="white" fontFamily="serif" fontSize="lg" w="full" cursor="pointer" appearance="none">
                <Select.Trigger>
                    <Select.ValueText placeholder={placeholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {collection.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}