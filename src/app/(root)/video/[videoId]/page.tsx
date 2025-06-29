import Header from "@/components/shared/header";

type Props = {
  params: {
    videoId: string;
  };
};

const Page = ({ params }: Props) => {
  const { videoId } = params;
  console.log(videoId);
  return (
    <div>
      <Header
        title="Agulue Chidubem"
        subHeader="chidubem@gmail.com"
        image="https://i.pinimg.com/originals/27/ff/79/27ff79f41b15e35d5b8cc7a50ad96cb4.jpg"
      />

      <h1>Video details page for id: {videoId}</h1>
    </div>
  );
};

export default Page;
