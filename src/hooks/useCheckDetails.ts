import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Custom React hook that checks for user details stored in localStorage
 * and navigates the user to the appropriate page based on their presence.
 *
 * - If `username` or `jobTitle` is missing in localStorage, the user is redirected to the home page (`/`).
 * - If both `username` and `jobTitle` are present, the user is redirected to the information page (`/information`).
 */
export const useCheckDetails = () => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const jobTitle = localStorage.getItem("jobTitle");

    if (!username || !jobTitle) {
      console.log("User details not found. Navigating to home page.");
      router.push("/");
    } else {
      console.log("User details found. Navigating to information page.");
      router.push("/information");
    }
  }, [router]);
};
