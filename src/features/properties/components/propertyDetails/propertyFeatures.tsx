import { Box, Grid, Text } from "@chakra-ui/react";
import Amenity from "./amenity";

export default function PropertyFeatures({features } : any) {
  return   <Box
              bg="brand.800"
              border="1px solid"
              borderColor="secondary.800"
              borderRadius="sm"
              p={{ base: 6, md: 10 }}
              mt={10}
            >
              <Text
                fontFamily="heading"
                fontSize={{ base: "xl", md: "2xl" }}
                color="secondary.100"
                fontStyle="italic"
                fontWeight="400"
                mb={8}
              >
              </Text>

              <Grid
                templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                gap={{ base: 7, sm: 8, md: 10 }}
              >
                <Amenity
                  icon={MdOutlineLocalMovies}
                  title="Private Cinema"
                  description="12-seat 4K Dolby Atmos theater."
                />
                <Amenity
                  icon={MdOutlineWineBar}
                  title="Wine Cellar"
                  description="Climate-controlled for 2,500 bottles."
                />
                <Amenity
                  icon={MdOutlineSpa}
                  title="Wellness Suite"
                  description="Hammam, sauna, and massage room."
                />
                <Amenity
                  icon={MdOutlineSupportAgent}
                  title="24/7 Concierge"
                  description="Dedicated stay on call around the clock."
                />
              </Grid>
            </Box>;
}