import Header from "@/components/shared/header";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  return (
    <div>
      <Header
        title="Agulue Chidubem"
        subHeader="chidubem@gmail.com"
        image="https://i.pinimg.com/originals/27/ff/79/27ff79f41b15e35d5b8cc7a50ad96cb4.jpg"
      />
      <h1>ProfilePage {id}</h1>
    </div>
  );
};

export default Page;
