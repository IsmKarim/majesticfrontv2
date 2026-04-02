import { Box, Flex, Icon, Text } from "@chakra-ui/react";

export default function ServiceCardVar({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <Flex
      w="100%"
      h="100%"
      my="auto"
      minH="200px"
      boxShadow="md"
      direction="column"
      justify="center"
      align="center"
      gap={8}
      px={8}
      py={6}
      border="1px solid"
      borderColor="transparent"


      cursor="pointer"
      transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        borderColor: "secondary.700",
        bg: "whiteAlpha.50",
      }}
    >
   
      {/* 
        To make _groupHover work, add the `group` prop 
        to the parent Flex above. Alternatively, use 
        CSS-based approach below:
      */}
      <Box
        p={4}
        bgColor="whiteAlpha.200"
        borderRadius={8}
        textAlign="center"
        transition="transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s ease"
      >
        <Icon>
          <img src={image} alt={title} width={24} height={24} />
        </Icon>
      </Box>

      <Text color="white" as="h4" transition="color 0.3s ease">
        {title}
      </Text>

      <Text color="secondary.300" textAlign="center" transition="color 0.3s ease">
        {description}
      </Text>
    </Flex>
  );
}