import { Box } from "@chakra-ui/react";
import React from "react";

type CardProps = {
  image?: string;
  inFocus?: boolean;
};

export const Card = (props: CardProps) => {
  return <Box border="1px solid grey" maxW="300px" minH="200px"></Box>;
};
