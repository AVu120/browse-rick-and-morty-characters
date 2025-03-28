import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react";

export const CardHorizontal = () => (
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
      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      alt="Caffe Latte"
    />
    <Box p={4}>
      <Card.Body>
        <Card.Title mb="2" fontSize={{ base: "lg", md: "xl" }}>
          The perfect latte
        </Card.Title>
      </Card.Body>
    </Box>
  </Card.Root>
);
