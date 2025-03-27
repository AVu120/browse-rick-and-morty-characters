import { Button, HStack } from "@chakra-ui/react";

/* TODO:
1. Create entry form page.
2. fill out and click submit.
3. save to zustand with local storage persistance
4. navigate to separata page called "Information Page"
5. on load of information page, query public gralhQL API
6. render first page of results, including data and images
7. show username + job title in header or footer
8. Add pagination
9. Ensure user can navigate to spcific page of the paginated data via direct link/url 
10. When click on item/row in information page, it should open a modal that displays the/nore information about that item. 
11. Deploy on vercel free tier.
12. Upload code to github public repository.
13. Enhance to ensure responsiveness across mobile and desktop.
14. Enhance to ensure accessibility.
15. Enhance to ensure better quality over UX.
16. Enhance to enusre better developer experience.
17. Make list of tests that could be written/write them if time and make them runnable locally as git husky push hook.
18. On github push, run these in CI and alert user if they're failed.
19. Block merge to main git branch, get these CI to run on PR branch and block merge until this passes. 
*/
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main>
        <HStack>
          <Button colorPalette="teal" variant="solid">
            Click me
          </Button>
          <Button colorPalette="teal" variant="solid">
            Click me
          </Button>
        </HStack>
      </main>
    </div>
  );
}
