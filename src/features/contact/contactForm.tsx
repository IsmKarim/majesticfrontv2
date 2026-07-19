"use client";

import { Button, Field, Input, SimpleGrid, Stack, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, ContactFormValues } from "./contact.schema";

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
  submitLabel = "Envoyer le message",
  isLoading = false,
  isDisabled = false,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
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
              Prénom
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Yasmine"
              {...register("firstName")}
              disabled={isDisabled || submitting}
            />
            <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.lastName} required>
            <Field.Label>
              Nom
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Alaoui"
              {...register("lastName")}
              disabled={isDisabled || submitting}
            />
            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
          </Field.Root>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <Field.Root invalid={!!errors.email} required>
            <Field.Label>
              Email
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="email"
              placeholder="yasmine@exemple.com"
              {...register("email")}
              disabled={isDisabled || submitting}
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.phoneNumber} required>
            <Field.Label>
              Téléphone
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="tel"
              placeholder="+212 6 12 34 56 78"
              {...register("phoneNumber")}
              disabled={isDisabled || submitting}
            />
            <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
          </Field.Root>
        </SimpleGrid>

        <Field.Root invalid={!!errors.message} required>
          <Field.Label>
            Message
            <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            placeholder="Dites-nous comment nous pouvons vous aider..."
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
          loadingText="Envoi en cours..."
          disabled={isDisabled || submitting}
          alignSelf={{ base: "stretch", md: "flex-start" }}
        >
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
}
