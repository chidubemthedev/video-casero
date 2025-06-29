import Nav from "@/components/shared/nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen">
      <Nav />
      <section className="flex flex-col py-8 px-4 max-w-7xl mx-auto w-full">
        {children}
      </section>
    </main>
  );
}
