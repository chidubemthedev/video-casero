import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Upload, Video, Search } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
  title: string;
  subHeader: string;
  image?: string;
};

const Header = ({ title, subHeader, image }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {image && (
            <Image
              src={image}
              alt={title}
              width={66}
              height={66}
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-sm text-gray-500">{subHeader}</p>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload />
            Upload Video
          </Button>

          <Button>
            <Video />
            Record a Video
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="relative flex items-center gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="Search for a video"
            className="h-10"
          />
          <Button className="absolute right-1 h-8">
            <Search />
            Search
          </Button>
        </div>

        <h1 className="text-sm text-gray-500">dropdown</h1>
      </div>
    </>
  );
};

export default Header;
