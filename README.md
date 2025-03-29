## Notes About Project

- Access to any other part of website is blocked until username and job title is entered on home page.
- Used as few dependencies as possible. Local storage used for on-disc state/data persistence of username and job title.
- After entering this data, user navigates to information page where apollo client is used to query images and data from public Rick and Morty graphql API (https://rickandmortyapi.com/graphql & https://rickandmortyapi.com/documentation/#graphql) then render them as a paginated list.
- User can see their username and job title in full on the information page header.
- User can click the profile icon button on the right of the header to update their username and job title.
- Underneath the header is the pagination buttons and a paginated list of Rick and Morty characters showing their name and image.
- Pagination state (e.g. current page number) is preserved via url.
- Clicking on any list item/card opens a modal that displays more information about that character.
- Accessible, entire website can be used with just keyboard e.g. by navigating using tab, enter and esc keys.
- Compliant with device's setting of light or dark mode.
- Performant as possible by moving state as far down the component tree as possible.
- Built to be responsive across mobile and desktop.

- [Chakra-UI v3](https://chakra-ui.com/) used for UI component library.
- [NextJS v15](https://nextjs.org/) with App Router & TypeScript used.

## Getting Started

First, install dependecies:

```bash
npm i

```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run in Production Mode

```bash
npm run build
npm run start
```
