// $.tsx
import {
  Content,
  fetchOneEntry,
  isEditing,
  isPreviewing,
} from '@builder.io/sdk-react/edge';
import type {LoaderFunction} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';

export const loader: LoaderFunction = async ({params, request}) => {
  return {};
};

// Define and render the page.
export default function Page() {
  // Use the useLoaderData hook to get the Page data from `loader` above.
  const {} = useLoaderData<typeof loader>();

  // Render the page content from Builder.io
  return <div> hello world</div>;
}
