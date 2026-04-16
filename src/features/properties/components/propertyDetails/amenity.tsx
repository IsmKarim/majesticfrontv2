import Iconify from "@/components/ui/iconify";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";

export default function Amenity ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description?: string;
}) {
  return (
    <HStack align="flex-start" gap={4}>
      <Iconify icon={icon} boxSize={5} color="secondary.300" mt="2px" flexShrink={0} />
      <VStack align="flex-start" gap={0}>
        <Text
          fontSize="xs"
          fontWeight="700"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="secondary.100"
        >
          {title}
        </Text>
        <Text fontSize="xs" color="secondary.400" lineHeight="tall">
          {description}
        </Text>
      </VStack>
    </HStack>
  );
}
