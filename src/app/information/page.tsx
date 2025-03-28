"use client";

export default function Home() {
  const username = localStorage.getItem("username");
  const jobTitle = localStorage.getItem("jobTitle");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="flex flex-col gap-4">{`Hello! ${username} with job title ${jobTitle}`}</main>
      <footer></footer>
    </div>
  );
}
