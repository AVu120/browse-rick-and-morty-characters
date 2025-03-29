"use client";
import { useRouter } from "next/navigation";
import { Field, Input, Heading, Button, Text } from "@chakra-ui/react";
import { useDetails } from "~/hooks/useDetails";

/* TODO:
1. Create entry form for username + job title page.
2. fill out and click submit.
3. save to local storage persistance
4. navigate to separata page called "Information Page"
5. show username + job title in header or footer
6. enable user to change username + job title. 
7. on load on website again on any page, check if username + job title has been set, if not redirect user to form page. If yes, redirect to "information page". Create custom hook for this.
5. on load of information page, query public gralhQL API
6. render first page of results, including data (just name for now) and images in a list of items
7. Add pagination
9. Ensure user can navigate to spcific page of the paginated data via direct link/url 
10. When click on item/row in information page, it should open a modal that displays the/more information about that item. 
11. Deploy on vercel free tier.
12. Upload code to github public repository.
13. Enhance to ensure responsiveness across mobile and desktop.
14. Enhance to ensure accessibility.
15. Enhance to ensure better quality over UX.
16. Enhance to enusre better developer experience.
17. (Would do if had more time) Make list of tests that could be written/write them if time and make them runnable locally as git husky push hook.
18. (Would do if had more time) On github push, run these in CI and alert user if they're failed.
19. (Would do if had more time) Block direct git push to remote main branch, get these CI tests to run on PR branch and block merge until this passes. 
*/
export default function Home() {
  const { username, setUsername, jobTitle, setJobTitle, hasLoaded } =
    useDetails();
  const router = useRouter();
  // const [hasSubmitted, setHasSubmitted] = useState(false);

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const changeJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !jobTitle) {
      return alert("Please fill out all fields");
    }

    localStorage.setItem("username", username);
    localStorage.setItem("jobTitle", jobTitle);
    alert("Details saved successfully. Now navigating to information page.");
    router.push("/information");
  };

  const isDisabled = !username || !jobTitle;

  return (
    <div className="flex items-center justify-center min-h-screen">
      {hasLoaded ? (
        <main className="flex flex-col gap-4">
          <Heading as="h1">Enter your username and job title</Heading>
          <form className="flex flex-col gap-4" onSubmit={onSave}>
            <Field.Root invalid={!username}>
              <Field.Label>Username</Field.Label>
              <Input
                onChange={changeUsername}
                value={username}
                placeholder="Enter your username"
              />
              <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!jobTitle}>
              <Field.Label>Job Title</Field.Label>
              <Input
                onChange={changeJobTitle}
                value={jobTitle}
                placeholder="Enter your job title"
              />
              <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>
            <div className="flex justify-end">
              <Button
                colorPalette="teal"
                variant="solid"
                type="submit"
                disabled={isDisabled}
              >
                Save
              </Button>
            </div>
          </form>
        </main>
      ) : (
        <Text>Loading... </Text>
      )}
    </div>
  );
}
