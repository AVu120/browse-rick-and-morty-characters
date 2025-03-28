"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  IconButton,
  Input,
  Portal,
  Text,
  useDialog,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { useDetails } from "~/hooks/useDetails";

export default function Home() {
  const dialog = useDialog();
  const { username, jobTitle, hasLoaded, updateDetails } = useDetails();
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentJobTitle, setCurrentJobTitle] = useState(jobTitle);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const changeCurrentUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUsername(e.target.value);
  };

  const changeCurrentJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentJobTitle(e.target.value);
  };

  const isDisabled = !username || !jobTitle;

  useEffect(() => {
    setCurrentUsername(username);
    setCurrentJobTitle(jobTitle);
  }, [username, jobTitle]);

  const onClose = () => {
    console.log("FIRE");
    setCurrentUsername(username);
    setCurrentJobTitle(jobTitle);
  };

  const onSave = (e: React.FormEvent) => {
    console.log("SAVE");
    e.preventDefault();
    if (!currentUsername || !currentJobTitle) {
      return alert("Please fill out all fields");
    }

    updateDetails(currentUsername, currentJobTitle);
    setIsEditModalOpen(false);
  };

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
          {hasLoaded
            ? `Hello ${username} with job title: ${jobTitle}`
            : "Loading..."}
        </Text>

        <Dialog.Root
          size="full"
          open={isEditModalOpen}
          onOpenChange={(e) => setIsEditModalOpen(e.open)}
        >
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
                  <Dialog.Title>Update your details</Dialog.Title>
                </Dialog.Header>
                <form className="flex flex-col gap-4" onSubmit={onSave}>
                  <Dialog.Body>
                    <Field.Root invalid={!currentUsername}>
                      <Field.Label>Username</Field.Label>
                      <Input
                        onChange={changeCurrentUsername}
                        value={currentUsername}
                        placeholder="Enter your username"
                      />
                      <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!currentJobTitle}>
                      <Field.Label>Job Title</Field.Label>
                      <Input
                        onChange={changeCurrentJobTitle}
                        value={currentJobTitle}
                        placeholder="Enter your job title"
                      />
                      <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" onClick={onClose}>
                        Cancel
                      </Button>
                    </Dialog.ActionTrigger>

                    <Button disabled={isDisabled} type="submit">
                      Save
                    </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" onClick={onClose} />
                  </Dialog.CloseTrigger>
                </form>
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
