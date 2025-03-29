"use client";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { useDetails } from "~/hooks/useDetails";
import { gql } from "@apollo/client";
import { apolloClient } from "~/lib/apollo-client";
import { CardHorizontal } from "~/components/ui/Card";
import { PaginationButtons } from "~/components/ui/PaginationButtons";
import { useRouter, useSearchParams } from "next/navigation";
import EditDetailsModal from "./((components))/EditDetailsModal";

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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const [pagination, setPagination] = useState({
    count: 0,
    pages: 0,
    next: 0,
    prev: 0,
  });

  const fetchCharacters = (page: number) => {
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
    // Only retrieve the graphql data on load if both username, jobTitle and queryParam are entered.
    if (!!pageNumber) {
      if (!!username && !!jobTitle) {
        fetchCharacters(pageNumber);
      }
    } else {
      updatePageNumber(DEFAULT_PAGE_NUMBER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, jobTitle, pageNumber]);

  const updatePageNumber = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`); // this won't reload the page
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

        <EditDetailsModal
          username={username}
          jobTitle={jobTitle}
          updateDetails={updateDetails}
        >
          <IconButton aria-label="Update user details" rounded="full">
            <LuUser />
          </IconButton>
        </EditDetailsModal>
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
