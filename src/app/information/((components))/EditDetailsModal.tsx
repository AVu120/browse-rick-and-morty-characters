"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useState, ReactNode, FormEvent } from "react";

interface EditDetailsModalProps {
  username: string;
  jobTitle: string;
  updateDetails: (username: string, jobTitle: string) => void;
  children: ReactNode;
}

export default function EditDetailsModal({
  username,
  jobTitle,
  updateDetails,
  children,
}: EditDetailsModalProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(username);
  const [currentJobTitle, setCurrentJobTitle] = useState(jobTitle);

  const isDisabled = !currentUsername || !currentJobTitle;

  const changeCurrentUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUsername(e.target.value);
  };

  const changeCurrentJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentJobTitle(e.target.value);
  };

  const onClose = () => {
    setCurrentUsername(username);
    setCurrentJobTitle(jobTitle);
    setIsEditModalOpen(false);
  };

  const onOpen = () => {
    setCurrentUsername(username);
    setCurrentJobTitle(jobTitle);
    setIsEditModalOpen(true);
  };

  const onSave = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUsername || !currentJobTitle) {
      return alert("Please fill out all fields");
    }

    updateDetails(currentUsername, currentJobTitle);
    setIsEditModalOpen(false);
  };

  return (
    <Dialog.Root
      size="full"
      open={isEditModalOpen}
      onOpenChange={(e) => (e.open ? onOpen() : onClose())}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update your details</Dialog.Title>
            </Dialog.Header>
            <form onSubmit={onSave}>
              <Dialog.Body className="flex flex-col gap-4">
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
                <Button
                  disabled={isDisabled}
                  colorPalette="teal"
                  variant="solid"
                  type="submit"
                >
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
  );
}
