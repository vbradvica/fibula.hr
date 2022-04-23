import * as React from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  AspectRatio,
  SimpleGrid,
  Flex,
  GridItem,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, InfoIcon } from "@chakra-ui/icons";
import { ContactForm } from "../components/ContactForm";

const GATSBY_SITE_MAPS_KEY = process.env.GATSBY_SITE_MAPS_KEY;

const basePadding = { base: 6, md: 16 };

// markup
const IndexPage = () => {
  const isLarge = useBreakpointValue({ base: false, md: true });

  return (
    <Flex direction="column" align="stretch">
      <Box
        bgColor="blue.700"
        display="flex"
        justifyContent="center"
        minH={{ sm: "auto", md: "70vh" }}
        padding={basePadding}
      >
        <SimpleGrid
          maxW={1024}
          rowGap={8}
          width="100%"
          columns={{ sm: 1, md: 2 }}
        >
          <Box
            alignItems="flex-start"
            display="flex"
            flexDir="column"
            justifyContent="center"
          >
            <Heading
              size="3xl"
              mb={6}
              color="blue.300"
              paddingTop={{ base: 10, sm: 0 }}
            >
              Fibula d.o.o.
            </Heading>
            <Heading size="lg" mb={6} color="gray.50">
              CNC obrada metala i<br />
              polimera (plastike)
            </Heading>
            <Text fontSize="lg" mb={1} color="gray.50">
              <PhoneIcon />{" "}
              <Link
                href="tel:+38513496912"
                textDecor={{ base: "underline", md: "none" }}
                isExternal
              >
                (+385) 1 349 69 12
              </Link>
            </Text>
            <Text fontSize="lg" mb={6} color="gray.50">
              <PhoneIcon />{" "}
              <Link
                href="tel:+38513496912"
                textDecor={{ base: "underline", md: "none" }}
                isExternal
              >
                (+385) 91 545 86 00
              </Link>
            </Text>
            <Text fontSize="lg" mb={6} color="gray.50">
              <EmailIcon />{" "}
              <Link
                href="mailto:fibula@fibula.hr"
                textDecor={{ base: "underline", md: "none" }}
                isExternal
              >
                fibula@fibula.hr
              </Link>
            </Text>
            <Text fontSize="lg" color="gray.50">
              Samoborska cesta 145
            </Text>
            <Text fontSize="lg" color="gray.50">
              10090, Zagreb
            </Text>
            <Text fontSize="lg" color="gray.50">
              Hrvatska
            </Text>
          </Box>
          <Box
            alignItems="flex-start"
            display="flex"
            flexDir="column"
            justifyContent="center"
          >
            <AspectRatio
              width="100%"
              minH={320}
              ratio={{ xs: 1, sm: 1, md: 4 / 3, lg: 16 / 9 }}
            >
              <iframe
                frameBorder={0}
                src={`https://www.google.com/maps/embed/v1/place?key=${GATSBY_SITE_MAPS_KEY}&q=Fibula%20d.o.o.&zoom=13`}
              />
            </AspectRatio>
          </Box>
        </SimpleGrid>
      </Box>
      <Box
        alignSelf="center"
        maxW={1024}
        padding={basePadding}
        // paddingX={{ base: 6, sm: 0 }}
        py={10}
        width="100%"
      >
        <Heading color="blue.700" size="lg">
          Usluge
        </Heading>
        <SimpleGrid
          alignSelf="center"
          columns={{ sm: 1, md: 2 }}
          rowGap={8}
          columnGap={8}
          pt={6}
        >
          <Box>
            <Box
              backgroundImage="url('/images/mill.jpg')"
              backgroundPosition="center center"
              backgroundSize="cover"
              height={175}
              opacity={0.7}
              width="100%"
            />
            <Heading marginBlock={2} size="md">
              CNC glodanje
            </Heading>
            <Text color="gray.700">
              Naši moderni CNC obradni centri pružaju odlične perfomanse
              glodanja metala i plastike. Kvaliteta izrade rezultira visoko
              kvalitetnim finalnim proizvodom.
            </Text>
            {!isLarge && (
              <Text mt={2} color="gray.700">
                <b>Materijali:</b> aluminij, nehrđajući čelik, mesing, bakar,
                Delrin, Acetal, Nylon, Teflon, Akril
              </Text>
            )}
          </Box>
          <Box>
            <Box
              backgroundImage="url('/images/lathe.jpg')"
              backgroundPosition="center center"
              backgroundSize="cover"
              height={175}
              opacity={0.7}
              width="100%"
            />
            <Heading marginBlock={2} size="md">
              CNC tokarenje
            </Heading>
            <Text color="gray.700">
              Pružamo visoku fleksibilnost i kvalitetu obrade na našim CNC
              obradnim centrima za tokarenje.
            </Text>
            {!isLarge && (
              <Text mt={2} color="gray.700">
                <b>Materijali:</b> aluminij, nehrđajući čelik, mesing, bakar,
                Delrin, Acetal, Nylon, Teflon, Akril
              </Text>
            )}
          </Box>
          {isLarge && (
            <Box as={GridItem} colSpan={2}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Metali</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Aluminij</Td>
                    <Td>
                      Laka obradivost i dobra elastičnost. Odličan omjer
                      čvrstoće i težine.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Nehrđajući čelik</Td>
                    <Td>
                      Jako čvrst materijal, otporan na koroziju i promjene
                      temperature.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Mesing</Td>
                    <Td>Materijal pogodan za pokretne mehanizme.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Bakar</Td>
                    <Td>Materijal pogodan za pokretne mehanizme.</Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3} color="gray.500" fontStyle="italic">
                      Obrada ostalih metala i materijala dostupna prema
                      dogovoru.
                    </Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Polimeri / Plastike</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">POM (Delrin/Acetal)</Td>
                    <Td>
                      Velika čvrstoća, visoka preciznost obrade, laka obradan.
                      Pogodan za pokretne mehanizme.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Najlon (Nylon)</Td>
                    <Td>
                      Odlična mehanička svojstva. Otporan na temperaturu,
                      kemikalije i abrazivno trošenje.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">PTFE (Teflon)</Td>
                    <Td>
                      Materijal pogodan za pokretne mehanizme. Otporan na
                      temperature i kemikalije.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Polikarbonat (Polycarbonate)</Td>
                    <Td>Otporan na mehaničke sile, proziran.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">PMMA / Akril (Acrylic)</Td>
                    <Td>
                      Proziran i čvrst materijal koji se često koristi kao
                      zamjena za staklo.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3} color="gray.500" fontStyle="italic">
                      <i>
                        Obrada ostalih polimera, plastika i materijala dostupna
                        prema dogovoru.
                      </i>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          )}
          <Box>
            <Box>
              <Box
                backgroundImage="url('/images/3d_print.jpg')"
                backgroundPosition="center center"
                backgroundSize="cover"
                height={175}
                opacity={0.7}
                width="100%"
              />
              <Heading marginBlock={2} size="md">
                3D printanje
              </Heading>
              <Text color="gray.700">
                3D printanje prototipova i dijelova od raznih polimera.
              </Text>
            </Box>
          </Box>
          <Box>
            <Box>
              <Box
                backgroundImage="url('/images/other.jpg')"
                backgroundPosition="center center"
                backgroundSize="cover"
                height={175}
                opacity={0.7}
                width="100%"
              />
              <Heading marginBlock={2} size="md">
                Ostale usluge
              </Heading>
              <Text color="gray.700">Ostale usluge prema dogovoru.</Text>
            </Box>
          </Box>
          {isLarge && (
            <Box as={GridItem} colSpan={2}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>3D Printanje - Materijali</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">PETG</Td>
                    <Td>
                      Pogodan materijal za printanje, glatka završna površina,
                      otporan na vodu.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">PLA</Td>
                    <Td>
                      Odličan materijal za izradu prototipa zbog niske cijene,
                      lagane primjene i dobrog zadžavanja dimenzija nakon
                      hlađenja.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">ABS / ASA</Td>
                    <Td>
                      Materijal pogodan za printanje čvrstih i otpornih dijelova
                      koji mogu izdržati visoke temperature. ASA je pogodna za
                      vanjsku primjenu zbog otpornosti na UV zračenje.
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">TPU/TPE</Td>
                    <Td>Plastika s elastičnim svojstvima slična gumi.</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td color="gray.500" fontStyle="italic">
                      Obrada ostalih metala i materijala dostupna prema
                      dogovoru.
                    </Td>
                    <Td></Td>
                  </Tr>
                </Tbody>
                <Thead>
                  <Tr>
                    <Th>Ostale usluge</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Klasična strojna obrada</Td>
                    <Td>
                      Glodanje i tokarenje metala i plastike klasičnim
                      strojevima visoke preciznosti
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Bušenje</Td>
                    <Td>Bušenje većih radijusa stupnom bušilicom</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Graviranje</Td>
                    <Td>Graviranje natpisa, kontrolnih ploča i logotipa</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Brušenje</Td>
                    <Td></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          )}
        </SimpleGrid>
      </Box>
      <Box display="flex" justifyContent="center" bgColor="blue.700">
        <Box
          alignSelf="center"
          maxW={1024}
          padding={basePadding}
          // paddingX={{ base: 6, sm: 0 }}
          py={10}
          width="100%"
        >
          <Heading color="white" size="lg">
            Kontaktirajte nas
          </Heading>
          <ContactForm />
        </Box>
      </Box>
      <Box
        bgColor="gray.200"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={basePadding}
        // paddingX={{ base: 6, sm: 0 }}
        pt={10}
        width="100%"
      >
        <Box as={GridItem} colSpan={2} textAlign="start">
          <Heading size="md">
            FIBULA, d.o.o.
            <small>za proizvodnju, trgovinu i usluge</small>
          </Heading>
        </Box>
        <SimpleGrid
          justifyContent="center"
          columnGap={8}
          columns={{ sm: 1, md: 2 }}
          maxW={640}
          py={6}
          rowGap={8}
          width="100%"
        >
          <Box as={GridItem} display="flex" flexDir="row">
            <InfoIcon margin="4px" />
            <address>
              Samoborska cesta 145.
              <br />
              10000, Zagreb
              <br />
              Hrvatska
              <br />
            </address>
          </Box>
          <Box as={GridItem}>
            <PhoneIcon /> (+385) 1 3496 912
            <br />
            <EmailIcon /> <a href="mailto:fibula@fibula.hr">fibula@fibula.hr</a>
            <br />
            <PhoneIcon /> (+385) 91 5458 600
            <br />
            <PhoneIcon /> (+385) 91 5908 342
            <br />
          </Box>
        </SimpleGrid>
        <Box as={GridItem} colSpan={2} textAlign="center">
          2019 © Fibula d.o.o.
        </Box>
      </Box>
    </Flex>
  );
};

export default IndexPage;
