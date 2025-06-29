import Header from "@/components/shared/header";
import VideoCard from "@/components/shared/video-card";

const VIDEOS = [
  {
    id: "1",
    title: "Screen record - 001",
    thumbnail:
      "https://images.unsplash.com/photo-1749741355867-8d40976f2bfb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    createdAt: "2025-05-01 06:00:00",
    userImage:
      "https://i.pinimg.com/originals/27/ff/79/27ff79f41b15e35d5b8cc7a50ad96cb4.jpg",
    userName: "Jason Smith",
    views: 1000,
    visibility: "public",
    duration: 156,
  },
  {
    id: "2",
    title: "Screen record - 002",
    thumbnail:
      "https://images.unsplash.com/photo-1751104486292-e35ffb54b336?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    createdAt: "2025-05-09 06:00:00",
    userImage:
      "https://i.pinimg.com/originals/27/ff/79/27ff79f41b15e35d5b8cc7a50ad96cb4.jpg",
    userName: "Nens Moriah",
    views: 356,
    visibility: "public",
    duration: 1056,
  },
  {
    id: "3",
    title: "Screen record - 003",
    thumbnail:
      "https://images.unsplash.com/photo-1750544684761-cc028988a69e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    createdAt: "2025-05-09 06:04:00",
    userImage:
      "https://i.pinimg.com/originals/27/ff/79/27ff79f41b15e35d5b8cc7a50ad96cb4.jpg",
    userName: "Nens Moriah",
    views: 56,
    visibility: "public",
    duration: 656,
  },
];

const Home = () => {
  return (
    <>
      <Header title="All Videos" subHeader="Public Library" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {VIDEOS.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </>
  );
};

export default Home;
