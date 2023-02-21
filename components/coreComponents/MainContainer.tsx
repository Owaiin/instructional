export default function MainContainer({ children }) {
  return (
    <>
      <main className="mt-20 w-full px-5">
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
}
