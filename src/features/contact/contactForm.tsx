"use client";

import { Button, Field, Input, SimpleGrid, Stack, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { createContactFormSchema, ContactFormValues } from "./contact.schema";

type ContactFormProps = {
  onSubmit: (values: ContactFormValues) => Promise<void> | void;
  defaultValues?: Partial<ContactFormValues>;
  submitLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const DEFAULT_VALUES: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export default function ContactForm({
  onSubmit,
  defaultValues,
  submitLabel,
  isLoading = false,
  isDisabled = false,
}: ContactFormProps) {
  const t = useTranslations("contact.form");
  const tv = useTranslations("contact.validation");
  // Rebuilt when the locale changes so error messages follow the active language.
  const schema = useMemo(() => createContactFormSchema(tv), [tv]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const submitting = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap={5}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <Field.Root invalid={!!errors.firstName} required>
            <Field.Label>
              {t("firstName")}
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder={t("firstNamePlaceholder")}
              {...register("firstName")}
              disabled={isDisabled || submitting}
            />
            <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.lastName} required>
            <Field.Label>
              {t("lastName")}
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder={t("lastNamePlaceholder")}
              {...register("lastName")}
              disabled={isDisabled || submitting}
            />
            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
          </Field.Root>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <Field.Root invalid={!!errors.email} required>
            <Field.Label>
              {t("email")}
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              {...register("email")}
              disabled={isDisabled || submitting}
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.phoneNumber} required>
            <Field.Label>
              {t("phone")}
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="tel"
              placeholder={t("phonePlaceholder")}
              {...register("phoneNumber")}
              disabled={isDisabled || submitting}
            />
            <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
          </Field.Root>
        </SimpleGrid>

        <Field.Root invalid={!!errors.message} required>
          <Field.Label>
            {t("message")}
            <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            placeholder={t("messagePlaceholder")}
            minH="160px"
            resize="vertical"
            {...register("message")}
            disabled={isDisabled || submitting}
          />
          <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          loading={submitting}
          loadingText={t("submitting")}
          disabled={isDisabled || submitting}
          alignSelf={{ base: "stretch", md: "flex-start" }}
        >
          {submitLabel ?? t("submit")}
        </Button>
      </Stack>
    </form>
  );
}
