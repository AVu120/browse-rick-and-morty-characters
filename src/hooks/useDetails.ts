import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Custom React hook that stores username and jobtitle state using localStorage
 * and navigates the user to the appropriate page based on their presence.
 *
 * - If `username` or `jobTitle` is missing in localStorage, the user is redirected to the home page (`/`).
 * - If both `username` and `jobTitle` are present, the user is redirected to the information page (`/information`).
 */
export const useDetails = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  /* hasLoaded state added to prevent weird flickering of the page when the user data is being fetched from localStorage on initial page load. This is done by
   rendering a loading indicator until the user data has been fetched and the page can be rendered with the user data if it exists. */
  const [hasLoaded, setHasLoaded] = useState(false);

  const updateDetails = (username: string, jobTitle: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("jobTitle", jobTitle);
    setUsername(username);
    setJobTitle(jobTitle);
  };
  // Need to do this in useEffect since window object is only available after component has mounted on client. Doing this outside of useEffect results in window not defined error on server side.
  useEffect(() => {
    const initialUsername = localStorage.getItem("username") || "";
    const initialJobTitle = localStorage.getItem("jobTitle") || "";

    if (pathname === "/information" && (!initialUsername || !initialJobTitle)) {
      return router.push("/");
    } else if (pathname === "/" && !!initialUsername && !!initialJobTitle) {
      return router.push("/information");
    }

    setUsername(initialUsername);
    setJobTitle(initialJobTitle);
    setHasLoaded(true);
  }, []);

  return {
    username,
    setUsername,
    jobTitle,
    setJobTitle,
    hasLoaded,
    updateDetails,
  };
};
