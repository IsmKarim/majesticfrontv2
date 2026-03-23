import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import Iconify from "./iconify";

export default function SwitchInput({ label, icon, onValueChange }: any) {


    return (
        <>
            <Box
                flex="1"
                position="relative"
                bg={{ base: 'blackAlpha.200', md: 'transparent' }}
                borderRadius={{ base: 'md', md: '0' }}
                mt={{ base: 2, md: 0 }}
                data-group
            >
                <Box position="absolute" top="50%" left="4" transform="translateY(-50%)" pointerEvents="none">
                    <Iconify
                        icon={icon}
                        color="whiteAlpha.600"
                        w="20px"
                        h="20px"
                        transition="color 0.2s"
                        _hover={{ color: 'secondary.500' }}
                        _focusWithin={{ color: 'secondary.500' }}
                    />
                </Box>

                <Flex h="full" direction="column" justify="center" pl={12} pr={4} py={4}>
                    <Text fontSize="10px" textTransform="uppercase" letterSpacing="wider" color="whiteAlpha.500" mb="1">
                        {label}
                    </Text>

                    <Switch.Root>
                        <Switch.HiddenInput />
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                        <Switch.Label />
                    </Switch.Root>
                </Flex>

            </Box></>
    )
}