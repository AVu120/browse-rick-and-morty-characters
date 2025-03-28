"use client";

import { useDetails } from "~/hooks/useDetails";
import { Text } from "@chakra-ui/react";

export default function Home() {
  const { username, jobTitle, hasLoaded } = useDetails();

  return (
    <div className="flex items-center justify-center min-h-screen">
      {hasLoaded ? (
        <main className="flex flex-col gap-4">{`Hello! ${username} with job title ${jobTitle}`}</main>
      ) : (
        <Text>Loading...</Text>
      )}
      <footer></footer>
    </div>
  );
}
