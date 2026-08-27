'use client';

import React, { useMemo, useState } from 'react';
import { Box, Button, Flex, HStack, Text, Collapsible } from '@chakra-ui/react';
import Iconify from '@/components/ui/iconify';
import GlassSelect from '@/components/ui/glassSelect';
import { useSearch } from './useSearch';
import SwitchInput from '@/components/ui/switchInput';
import GlassNumberInput from '@/components/ui/glassNumberInput';
import GlassSlider from '@/components/ui/glassSlider';
import { createListCollection } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { PROPERTYTYPES } from '@/config/propertyOptions';
import { citiesCollection } from '@/config/citiesData';
import SearchTabs from './searchTabs';

// Numeric option values are stable; only the labels are localized, so the
// collections are built inside the component against the active catalog.
const BEDROOM_VALUES = ['0', '1', '2', '3', '4', '5'];
const BATHROOM_VALUES = ['0', '1', '2', '3', '4'];

const SearchWidget = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const t = useTranslations('search');
  const tType = useTranslations('propertyTypes');

  const { updateSearchQuery, submitSearch, neighborhoodsOptions, searchQuery } = useSearch();

  const propertyTypesCollection = useMemo(
    () => createListCollection({
      items: PROPERTYTYPES.map((type) => ({ label: tType(type.value), value: type.value })),
    }),
    [tType],
  );

  const bedroomsCollection = useMemo(() => ({
    items: BEDROOM_VALUES.map((v) => ({ label: v === '0' ? t('anyFemalePlural') : `${v}+`, value: v })),
  }), [t]);

  const bathroomsCollection = useMemo(() => ({
    items: BATHROOM_VALUES.map((v) => ({ label: v === '0' ? t('anyFemalePlural') : `${v}+`, value: v })),
  }), [t]);
  const equippedCollection = useMemo(() => ({
    items: [
      { label: t('any'), value: 'any' },
      { label: t('yes'), value: 'yes' },
      { label: t('no'), value: 'no' },
    ],
  }), [t]);

  return (
    <Box position="relative"  mx={{ base: 2, md: 'auto' }}>
      <SearchTabs
        value={searchQuery.transactionType}
        onValueChange={(transactionType) => updateSearchQuery({ transactionType })}
      />
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
                label={t("propertyType")}
                placeholder={t("propertyTypePlaceholder")}
                icon="mdi:home-outline"
                onValueChange={(propertyType: string) =>
                  updateSearchQuery({ propertyType })
                }
              />

              <GlassSelect
                collection={citiesCollection}
                label={t("city")}
                placeholder={t("cityPlaceholder")}
                icon="mdi:map-marker-outline"
                onValueChange={(city: string) =>
                  updateSearchQuery({ city, neighborhood: '' })
                }
              />

              <GlassSelect
                collection={{ items: neighborhoodsOptions }}
                label={t("neighborhood")}
                placeholder={t("neighborhoodPlaceholder")}
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
                      label={t("bedrooms")}
                      placeholder={t("anyFemalePlural")}
                      icon="mdi:bed-outline"
                      onValueChange={(v: string) =>
                        updateSearchQuery({ bedrooms: Number(v) })
                      }
                    />

                    <GlassNumberInput
                      collection={bathroomsCollection}
                      label={t("bathrooms")}
                      placeholder={t("anyFemalePlural")}
                      icon="mdi:shower"
                      onValueChange={(v: string) =>
                        updateSearchQuery({ bathrooms: Number(v) })
                      }
                    />

                    <SwitchInput
                      collection={equippedCollection}
                      label={t("equipped")}
                      icon="mdi:sofa-outline"
                      onValueChange={(v: string) =>
                        updateSearchQuery({ equipped: v as 'any' | 'yes' | 'no' })
                      }
                    />

                    <Box flex="2" minW={0}>
                      <GlassSlider
                        label={t("price")}
                        placeholder={t("anyFemalePlural")}
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
                    <Text>{showMoreFilters ? t("lessFilters") : t("moreFilters")}</Text>
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
              onClick={submitSearch}
            >
              <HStack gap={2}>
                <Text>{t("submit")}</Text>
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
