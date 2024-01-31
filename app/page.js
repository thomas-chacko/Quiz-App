import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5 text-white bg-black">
      <h1 className="text-3xl">Quiz App</h1>
      <Link href={"/quiz"}>
        <button className="px-4 py-1 text-white bg-green-600 rounded-md">
          Start Quiz
        </button>
      </Link>
    </div>
  );
};
export default page;
