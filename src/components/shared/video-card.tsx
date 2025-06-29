"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  userImage: string;
  userName: string;
  views: number;
  visibility: string;
  duration: number;
};

const VideoCard = ({
  id,
  title,
  thumbnail,
  createdAt,
  userImage,
  userName,
  views,
  visibility,
  duration,
}: Props) => {
  return (
    <Link href={`/video/${id}`}>
      <Card className="pt-0">
        <CardHeader className="relative px-0">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              width={300}
              height={200}
              className="w-full h-[200px] object-cover hover:scale-125 transition-all duration-300"
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              alert("hello");
            }}
            className="absolute top-2 right-2"
            size={"icon"}
          >
            <Link2 />
          </Button>
          <Button className="absolute bottom-4 right-2 bg-gray-600" size={"sm"}>
            {Math.ceil(duration / 60)} min
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={userImage} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">{userName}</CardTitle>
                <CardDescription className="text-xs">
                  {visibility}
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Eye /> {views}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {new Date(createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoCard;
