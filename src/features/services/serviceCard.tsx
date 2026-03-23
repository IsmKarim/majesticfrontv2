import Iconify from "@/components/ui/iconify";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function ServiceCard({ title, description, image }: { title: string, description: string, image?: string }) {
  return <Flex direction={"column"} gap={6} bg="secondary.500" justify={"center"} p={8} align={"center"} color="white">


    <Iconify
      icon={
      'ph:handshake-thin'
      }
      w="50px"
      h="50px"
      color="white"
      
    />
    {image && <Image src={image || "/placeholder.png"} alt={title} width={120} height={200} />}

    <Text fontWeight={600}>{title}</Text>
    <Text textAlign={"center"}>{description}</Text>

  </Flex>;
}
