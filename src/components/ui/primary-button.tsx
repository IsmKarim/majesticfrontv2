import { Button, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function PrimaryButton({ children, ...props }, ref) {
    return (
      <Button
        ref={ref}
        px={{ base: 5, md: 6 }}
        py={{ base: 2, md: 3 }}
        borderRadius="full"
        fontWeight="semibold"
        bg="brand.500"
        color="white"
        _hover={{ bg: "brand.600", textDecoration: "none" }}
        _active={{ bg: "brand.700" }}
        _focusVisible={{
          boxShadow: "0 0 0 3px var(--chakra-colors-secondary-200)",
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export default PrimaryButton;
