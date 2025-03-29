import {
  Box,
  Card,
  CloseButton,
  Dialog,
  Image,
  Portal,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";

interface Props {
  name: string;
  imageUrl: string;
  created: string;
  gender: string;
  species: string;
  status: string;
}

export const CardHorizontal = ({
  name,
  imageUrl,
  created,
  gender,
  species,
  status,
}: Props) => (
  <Dialog.Root
    size="cover"
    placement="center"
    motionPreset="slide-in-bottom"
    scrollBehavior="inside"
  >
    <Dialog.Trigger asChild>
      <Card.Root
        flexDirection={{ base: "column", md: "row" }} // Column on mobile, row on desktop
        overflow="hidden"
        maxW={{ base: "full", md: "xl" }} // Full width on mobile, max width on desktop
        boxShadow="md"
        borderWidth="1px"
        borderRadius="lg"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", md: "200px" }} // Full width on mobile, fixed width on desktop
          src={imageUrl}
          alt={name}
        />
        <Box p={4}>
          <Card.Body>
            <Card.Title mb="2" fontSize={{ base: "lg", md: "xl" }}>
              {name}
            </Card.Title>
          </Card.Body>
        </Box>
      </Card.Root>
    </Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title fontSize={{ base: "lg", md: "2xl" }}>
              {name}
            </Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body>
            <Box
              display={{ base: "flex", md: "flex" }}
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
            >
              {/* Image */}
              <Image
                objectFit="cover"
                maxW={{ base: "100%", lg: "400px" }} // Full width on mobile, fixed width on desktop
                src={imageUrl}
                alt={name}
              />

              {/* Details */}
              <Box className="flex flex-col gap-4">
                <HStack>
                  <Text fontWeight="bold">Created:</Text>
                  <Text>{created}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Gender:</Text>
                  <Text>{gender}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Species:</Text>
                  <Text>{species}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Status:</Text>
                  <Text>{status}</Text>
                </HStack>
              </Box>
            </Box>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);
