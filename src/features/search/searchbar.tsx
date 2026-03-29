'use client';

import React, { useState } from 'react';
import { Box, Button, Flex, HStack, Text, Collapsible } from '@chakra-ui/react';
import Iconify from '@/components/ui/iconify';
import GlassSelect from '@/components/ui/glassSelect';
import { useSearch } from './useSearch';
import SwitchInput from '@/components/ui/switchInput';
import GlassNumberInput from '@/components/ui/glassNumberInput';
import GlassSlider from '@/components/ui/glassSlider';
import { propertyTypesCollection } from '@/config/data';
import { citiesCollection } from '@/config/citiesData';

enum SearchTab {
  BUY = 'Tous',
  RENT = 'Acheter',
  SOLD = 'Louer',
}

const bedroomsCollection = {
  items: [
    { label: 'Toutes', value: '0' },
    { label: '1+', value: '1' },
    { label: '2+', value: '2' },
    { label: '3+', value: '3' },
    { label: '4+', value: '4' },
    { label: '5+', value: '5' },
  ],
};

const bathroomsCollection = {
  items: [
    { label: 'Toutes', value: '0' },
    { label: '1+', value: '1' },
    { label: '2+', value: '2' },
    { label: '3+', value: '3' },
    { label: '4+', value: '4' },
  ],
};

const equippedCollection = {
  items: [
    { label: 'Tous', value: 'any' },
    { label: 'Oui', value: 'yes' },
    { label: 'Non', value: 'no' },
  ],
};

const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState<SearchTab>(SearchTab.BUY);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const { updateSearchQuery, neighborhoodsOptions, searchQuery } = useSearch();

  return (
    <Box position="relative"  mx={{ base: 2, md: 'auto' }}>
      <Box
        position="relative"
        zIndex={2}
        bg="blackAlpha.300"
        backdropFilter="blur(18px)"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        p={{ base: 2, md: 4 }}
        boxShadow="2xl"
        borderTopLeftRadius="0"
        borderTopRightRadius="sm"
        borderBottomRadius="sm"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 2, md: 4 }}
          align="stretch"
        >
          <Box flex="1" minW={0}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={{ base: 2, md: 4 }}
              align="stretch"
            >
              <GlassSelect
                collection={propertyTypesCollection}
                label="Type De Bien"
                placeholder="Tout"
                icon="mdi:home-outline"
                onValueChange={(propertyType: string) =>
                  updateSearchQuery({ propertyType })
                }
              />

              <GlassSelect
                collection={citiesCollection}
                label="Ville"
                placeholder="Toutes les villes"
                icon="mdi:map-marker-outline"
                onValueChange={(city: string) =>
                  updateSearchQuery({ city, neighborhood: '' })
                }
              />

              <GlassSelect
                collection={{ items: neighborhoodsOptions }}
                label="Quartier"
                placeholder="Tous les quartiers"
                icon="mdi:map-marker-outline"
                onValueChange={(neighborhood: string) =>
                  updateSearchQuery({ neighborhood })
                }
              />
            </Flex>

            <Collapsible.Root
              open={showMoreFilters}
              onOpenChange={(e) => setShowMoreFilters(e.open)}
              unmountOnExit
            >
              <Collapsible.Content>
                <Box
                  mt={3}
                  pt={3}
                  borderTopWidth="1px"
                  borderTopColor="whiteAlpha.200"
                >
                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    gap={{ base: 2, md: 4 }}
                    align="stretch"
                  >
                    <GlassNumberInput
                      collection={bedroomsCollection}
                      label="Chambres"
                      placeholder="Toutes"
                      icon="mdi:bed-outline"
                      onValueChange={(v: string) =>
                        updateSearchQuery({ bedrooms: Number(v) })
                      }
                    />

                    <GlassNumberInput
                      collection={bathroomsCollection}
                      label="Salles de bain"
                      placeholder="Toutes"
                      icon="mdi:shower"
                      onValueChange={(v: string) =>
                        updateSearchQuery({ bathrooms: Number(v) })
                      }
                    />

                    <SwitchInput
                      collection={equippedCollection}
                      label="Équipé"
                      icon="mdi:sofa-outline"
                      onValueChange={(v: string) =>
                        updateSearchQuery({ equipped: v as 'any' | 'yes' | 'no' })
                      }
                    />

                    <Box flex="2" minW={0}>
                      <GlassSlider
                        label="Prix"
                        placeholder="Toutes"
                        onValueChange={(v: [number, number]) => {
                          updateSearchQuery({ priceMin: v[0], priceMax: v[1] });
                        }}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Collapsible.Content>

              <Collapsible.Trigger asChild>
                <Box mt={3} color="white" _hover={{ bg: 'whiteAlpha.100' }}>
                  <HStack
                    gap={2}
                    mx="auto"
                    w="fit-content"
                    cursor="pointer"
                    py={1}
                  >
                    <Text>{showMoreFilters ? 'Moins' : 'Plus'} de filtres</Text>
                    <Iconify
                      icon={
                        showMoreFilters ? 'mdi:chevron-up' : 'mdi:chevron-down'
                      }
                      w="18px"
                      h="18px"
                    />
                  </HStack>
                </Box>
              </Collapsible.Trigger>
            </Collapsible.Root>
          </Box>

          <Box
            display="flex"
            flexShrink={0}
            alignItems="stretch"
            justifyContent={{ base: 'stretch', md: 'flex-end' }}
          >
            <Button
              w={{ base: 'full', md: 'auto' }}
              h={{ base: 'auto', md: 'full' }}
              px={10}
              py={4}
              maxH="80px"
              my="auto"
              bg="secondary.500"
              color="brand.900"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              transition="all 0.3s"
              borderRadius="0"
              _hover={{ bg: 'white', color: 'secondary.900' }}
              onClick={() => console.log(searchQuery)}
            >
              <HStack gap={2}>
                <Text>Trouver mon bien</Text>
                <Iconify icon="mdi:magnify" w="18px" h="18px" />
              </HStack>
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SearchWidget;
