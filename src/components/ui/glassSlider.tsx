import * as React from "react";
import { Box, Flex, Slider, Text } from "@chakra-ui/react";

export default function GlassSlider({
  label,
  onValueChange,
  defaultValue = [0, 10000000],
  ...rest
}: any) {
  const [range, setRange] = React.useState<[number, number]>([
    defaultValue[0],
    defaultValue[1],
  ]);

  const [minVal, maxVal] = React.useMemo(() => {
    const [a, b] = range;
    return a <= b ? [a, b] : [b, a];
  }, [range]);

  return (
    <Box
      flex="1"
      position="relative"
      bg={{ base: "blackAlpha.200", md: "transparent" }}
      borderRadius={{ base: "md", md: "0" }}
      mt={{ base: 2, md: 0 }}
      data-group
    >
      <Flex h="full" direction="column" justify="center" pl={12} pr={4} py={4}>
        <Flex align="baseline" justify="space-between" mb="2">
          <Text
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="wider"
            color="whiteAlpha.500"
          >
            {label}
          </Text>

          <Text
            fontSize="12px"
            color="whiteAlpha.800"
            fontVariantNumeric="tabular-nums"
          >
            Entre {minVal} et {maxVal} MAD
          </Text>
        </Flex>

        <Slider.Root
          maxW="md"
          value={range}
          minStepsBetweenThumbs={8}
          onValueChange={(details) => {
            const next = details.value as [number, number];
            setRange(next);
            onValueChange?.(next);
          }}
          getAriaValueText={(details) => {
            const v = details.value as number[];
            return v.length === 2 ? `Between ${v[0]} and ${v[1]}` : `${v[0]}`;
          }}
          {...rest}
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
          </Slider.Control>

          {/* Optional: keep for accessibility / SR, but your visible text is above */}
          {/* <Slider.ValueText /> */}
        </Slider.Root>
      </Flex>
    </Box>
  );
}
