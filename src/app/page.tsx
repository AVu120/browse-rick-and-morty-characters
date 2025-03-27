import { Button, HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main>
        <HStack>
          <Button colorPalette="teal" variant="solid">
            Click me
          </Button>
          <Button colorPalette="teal" variant="solid">
            Click me
          </Button>
        </HStack>
      </main>
    </div>
  );
}
