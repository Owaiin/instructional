export default function Post() {
  return (
    <>
      <h1>Dynamic Page</h1>
    </>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the post using params.id
}
