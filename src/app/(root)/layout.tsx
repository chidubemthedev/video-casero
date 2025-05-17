import Nav from "@/components/shared/nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen">
      <Nav />
      <section className="flex flex-col p-4">{children}</section>
    </main>
  );
}
