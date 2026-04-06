"use client";

import * as React from "react";
import {
  Box,
  Stack,
  HStack,
  Text,
  Slider,
  Stat,
  FormatNumber,
} from "@chakra-ui/react";

type PropertyMortgageProps = {
  price: number;
};

type LabeledSliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
};

function LabeledSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  suffix,
}: LabeledSliderProps) {
  return (
    <Box>
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="600">
          {label}
        </Text>
        <Text fontSize="sm" color="white">
          {step < 1 ? value.toFixed(1) : value.toFixed(0)}
          {suffix ? ` ${suffix}` : ""}
        </Text>
      </HStack>

      <Slider.Root
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(details) => {
          const v = details.value[0];
          if (typeof v === "number" && !Number.isNaN(v)) {
            onChange(v);
          }
        }}
        colorPalette="teal"
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
}

export default function PropertyMortgage({ price }: PropertyMortgageProps) {
  const [downPaymentPercent, setDownPaymentPercent] = React.useState(20);
  const [interestRate, setInterestRate] = React.useState(4);
  const [termYears, setTermYears] = React.useState(20);

  const { principal, monthlyPayment, totalInterest } = React.useMemo(() => {
    const apport = (price * downPaymentPercent) / 100;
    const principal = Math.max(price - apport, 0);

    const months = termYears * 12;
    const monthlyRate = interestRate / 100 / 12;

    if (months <= 0 || principal <= 0) {
      return {
        principal: 0,
        monthlyPayment: 0,
        totalInterest: 0,
      };
    }

    let monthlyPayment: number;

    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      const r = monthlyRate;
      monthlyPayment = principal * (r / (1 - Math.pow(1 + r, -months)));
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = Math.max(totalPaid - principal, 0);

    return { principal, monthlyPayment, totalInterest };
  }, [price, downPaymentPercent, interestRate, termYears]);

  return (
    <Box
      bg="brand.800"
      border="1px solid"
      borderColor="secondary.800"
      borderRadius="sm"
      p={{ base: 6, md: 10 }}
      mt={10}
      color="white"
    >
      <Text as="h3" fontWeight="semibold" mb={4}>
        Mortgage simulator
      </Text>

      <Stack gap={6}>
        <LabeledSlider
          label="Apport personnel (%)"
          min={0}
          max={80}
          step={1}
          value={downPaymentPercent}
          onChange={setDownPaymentPercent}
          suffix="%"
        />

        <LabeledSlider
          label="Taux d'intérêt annuel"
          min={0}
          max={12}
          step={0.05}
          value={interestRate}
          onChange={setInterestRate}
          suffix="%"
        />

        <LabeledSlider
          label="Durée du crédit (années)"
          min={5}
          max={30}
          step={1}
          value={termYears}
          onChange={setTermYears}
          suffix="ans"
        />

        <Stack direction={{ base: "column", md: "row" }} gap={4} mt={4}>
          <Stat.Root flex="1">
            <Stat.Label>Mensualité estimée</Stat.Label>
            <Stat.ValueText
              fontSize="2xl"
              fontWeight="bold"
              color="secondary.700"
            >
              <FormatNumber
                value={Number.isFinite(monthlyPayment) ? monthlyPayment : 0}
                style="currency"
                currency="MAD"
              />
            </Stat.ValueText>
            <Stat.HelpText>Sur {termYears.toFixed(0)} ans</Stat.HelpText>
          </Stat.Root>

          <Stat.Root flex="1">
            <Stat.Label>Montant emprunté</Stat.Label>
            <Stat.ValueText>
              <FormatNumber value={principal} style="currency" currency="MAD" />
            </Stat.ValueText>
          </Stat.Root>

          <Stat.Root flex="1">
            <Stat.Label>Intérêts totaux</Stat.Label>
            <Stat.ValueText>
              <FormatNumber
                value={totalInterest}
                style="currency"
                currency="MAD"
              />
            </Stat.ValueText>
          </Stat.Root>
        </Stack>

        <Text fontSize="xs" color="fg.muted">
          Simulation indicative — à valider avec votre banque.
        </Text>
      </Stack>
    </Box>
  );
}
