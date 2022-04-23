import React from "react"
import { ChakraProvider, CSSReset, theme } from "@chakra-ui/react"

export const wrapRootElement = ({ element }) => (
  <ChakraProvider theme={theme} resetCSS>
    {element}
  </ChakraProvider>
)