"use client";

import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  IconButton,
  Input,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { useDetails } from "~/hooks/useDetails";
import { gql } from "@apollo/client";
import { apolloClient } from "~/lib/apollo-client";
import { CardHorizontal } from "~/components/ui/card";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        count
        next
        prev
      }
      results {
        name
        status
        species
        type
        gender
        image
        created
      }
    }
  }
`;

export default function Home() {
  const { username, jobTitle, hasLoaded, updateDetails } = useDetails();
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentJobTitle, setCurrentJobTitle] = useState(jobTitle);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [characters, setCharacters] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const changeCurrentUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUsername(e.target.value);
  };

  const changeCurrentJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentJobTitle(e.target.value);
  };

  const isDisabled = !username || !jobTitle;

  const fetchCharacters = (page: number) => {
    apolloClient
      .query({
        query: GET_CHARACTERS,
        variables: { page },
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setCurrentUsername(username);
    setCurrentJobTitle(jobTitle);

    // Only retrieve the graphql data on load if both username and jobTitle are entered.
    if (!!username && !!jobTitle) {
      fetchCharacters(pageNumber);
    }
  }, [username, jobTitle, pageNumber]);

  const onClose = () => {
    setCurrentUsername(username);
    setCurrentJobTitle(jobTitle);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUsername || !currentJobTitle) {
      return alert("Please fill out all fields");
    }

    updateDetails(currentUsername, currentJobTitle);
    setIsEditModalOpen(false);
  };

  return (
    <Box className="flex flex-col min-h-screen">
      <Flex
        as="nav"
        bg="teal.500"
        color="white"
        p={4}
        justify="space-between"
        align="center"
        mb={4}
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
      <Box className="flex flex-col gap-4 items-center justify-center flex-grow">
        {<CardHorizontal />}
      </Box>
    </Box>
  );
}
