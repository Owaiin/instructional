export default function H1(props: { text: string }) {
  return (
    <>
      <h1 className="mb-5 text-2xl font-bold text-gray-800">{props.text}</h1>
    </>
  );
}
