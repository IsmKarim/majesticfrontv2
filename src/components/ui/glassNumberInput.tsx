import { Box, Flex, HStack, IconButton, NumberInput, Text } from "@chakra-ui/react";
import Iconify from "./iconify";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function GlassNumberInput({
  icon,
  label,
  placeholder,
  collection,
  onValueChange,
}: any) {
  return (
    <>
      <Box
        flex="1"
        position="relative"
        bg={{ base: "blackAlpha.200", md: "transparent" }}
        borderRadius={{ base: "md", md: "0" }}
        mt={{ base: 2, md: 0 }}
        data-group
      >
        <Box
          position="absolute"
          top="50%"
          left="4"
          transform="translateY(-50%)"
          pointerEvents="none"
        >
          <Iconify
            icon={icon}
            color="whiteAlpha.600"
            w="20px"
            h="20px"
            transition="color 0.2s"
            _hover={{ color: "secondary.500" }}
            _focusWithin={{ color: "secondary.500" }}
          />
        </Box>

        <Flex
          h="full"
          direction="column"
          justify="center"
          pl={12}
          pr={4}
          py={4}
        >
          <Text
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="wider"
            color="whiteAlpha.500"
            mb="1"
          >
            {label}
          </Text>

          <NumberInput.Root defaultValue="3" unstyled spinOnPress={false} color="white">
            <HStack gap="2">
              <NumberInput.DecrementTrigger asChild>
                <IconButton  size="sm">
                  <LuMinus />
                </IconButton>
              </NumberInput.DecrementTrigger>
              <NumberInput.ValueText
                textAlign="center"
                fontSize="lg"
                minW="3ch"
              />
              <NumberInput.IncrementTrigger asChild>
                <IconButton size="sm">
                  <LuPlus />
                </IconButton>
              </NumberInput.IncrementTrigger>
            </HStack>
          </NumberInput.Root>
        </Flex>
      </Box>
    </>
  );
}
