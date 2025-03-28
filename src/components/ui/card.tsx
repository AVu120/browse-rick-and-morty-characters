import { Box, Card, Image } from "@chakra-ui/react";

interface Props {
  name: string;
  imageUrl: string;
}

export const CardHorizontal = ({ name, imageUrl }: Props) => (
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
      alt="Caffe Latte"
    />
    <Box p={4}>
      <Card.Body>
        <Card.Title mb="2" fontSize={{ base: "lg", md: "xl" }}>
          {name}
        </Card.Title>
      </Card.Body>
    </Box>
  </Card.Root>
);
