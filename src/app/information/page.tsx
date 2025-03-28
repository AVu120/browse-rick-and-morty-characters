"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import { useDetails } from "~/hooks/useDetails";

export default function Home() {
  const { username, jobTitle, hasLoaded } = useDetails();

  return (
    <div className="flex flex-col min-h-screen">
      <Flex
        as="nav"
        bg="teal.500"
        color="white"
        p={4}
        justify="space-between"
        align="center"
      >
        <Text mx={2} fontWeight="bold">
          {`Hello ${username} with job title: ${jobTitle}!`}
        </Text>

        <Dialog.Root size="full">
          <Dialog.Trigger asChild>
            <IconButton aria-label="Update user details" rounded="full">
              <LuUser />
            </IconButton>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Dialog Title</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button>Save</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Flex>

      {/* Main Content */}
      <div className="flex items-center justify-center flex-grow">
        {hasLoaded ? (
          <main className="flex flex-col gap-4">{`Hello! ${username} with job title ${jobTitle}`}</main>
        ) : (
          <Text>Loading...</Text>
        )}
      </div>
    </div>
  );
}
