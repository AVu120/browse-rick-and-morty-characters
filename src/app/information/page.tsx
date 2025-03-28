"use client";

import { useEffect, useState } from "react";
import { useCheckDetails } from "~/hooks/useCheckDetails";
import { Text } from "@chakra-ui/react";

export default function Home() {
  useCheckDetails();
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    setJobTitle(localStorage.getItem("jobTitle") || "");
    setHasLoaded(true);
  }, []);

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
