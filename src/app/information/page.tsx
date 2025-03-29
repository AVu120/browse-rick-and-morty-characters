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
import { Suspense, useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { useDetails } from "~/hooks/useDetails";
import { gql } from "@apollo/client";
import { apolloClient } from "~/lib/apollo-client";
import { CardHorizontal } from "~/components/ui/Card";
import { PaginationButtons } from "~/components/ui/PaginationButtons";
import { useRouter, useSearchParams } from "next/navigation";

interface Character {
  name: string;
  created: string;
  gender: string;
  image: string;
  species: string;
  status: string;
}

interface Pagination {
  count: number;
  pages: number;
  next: number;
  prev: number;
}

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

const DEFAULT_PAGE_NUMBER = 1;

function InformationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageQueryParam = searchParams.get("page");
  const pageNumber = parseInt(pageQueryParam || "");

  const { username, jobTitle, hasLoaded, updateDetails } = useDetails();
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentJobTitle, setCurrentJobTitle] = useState(jobTitle);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const [pagination, setPagination] = useState({
    count: 0,
    pages: 0,
    next: 0,
    prev: 0,
  });

  const changeCurrentUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUsername(e.target.value);
  };

  const changeCurrentJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentJobTitle(e.target.value);
  };

  const isDisabled = !username || !jobTitle;

  const fetchCharacters = (page: number) => {
    console.log("Fetching characters...");
    // Doing call here instead of using useQuery because I don't want to run this on component mount.
    // I only want to run this when I need to (e.g. event-driven) such as when both username and jobTitle are entered.
    setIsFetching(true);
    apolloClient
      .query({
        query: GET_CHARACTERS,
        variables: { page },
      })
      .then((result) => {
        const charactersResponse: Character[] =
          result.data.characters.results.map((result: Character) => ({
            name: result.name,
            created: result.created,
            gender: result.gender,
            image: result.image,
            species: result.species,
            status: result.status,
          }));
        const paginationResponse: Pagination = result.data.characters.info;
        setPagination({
          count: paginationResponse.count,
          pages: paginationResponse.pages,
          next: paginationResponse.next,
          prev: paginationResponse.prev,
        });

        setCharacters(charactersResponse);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    setCurrentUsername(username);
    setCurrentJobTitle(jobTitle);
  }, [username, jobTitle]);

  const updatePageNumber = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`); // this won't reload the page
  };

  useEffect(() => {
    if (!!pageNumber) {
      // Only retrieve the graphql data on load if both username, jobTitle and queryParam are entered.
      if (!!username && !!jobTitle) {
        fetchCharacters(pageNumber);
      }
      // If pageQueryParam is not present, set it to 1.
    } else {
      updatePageNumber(DEFAULT_PAGE_NUMBER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            ? `Information Page: Hello ${username} (${jobTitle})`
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
      <Box className="flex flex-col gap-4 items-center justify-start flex-grow">
        <PaginationButtons
          count={pagination.count}
          pageSize={20}
          defaultPageNumber={pageNumber}
          onChangePageNumber={updatePageNumber}
        />

        {/* Main Content */}
        <Box className="flex flex-col gap-4" marginBottom={4}>
          {isFetching ? (
            <Text>Loading...</Text>
          ) : (
            characters.map(
              ({ name, image, created, gender, species, status }) => (
                <CardHorizontal
                  key={name + image}
                  name={name}
                  imageUrl={image}
                  created={created}
                  gender={gender}
                  species={species}
                  status={status}
                />
              )
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function Information() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <InformationContent />
    </Suspense>
  );
}
