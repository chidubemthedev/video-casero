import React from "react";
import { Input } from "./ui/input";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

type Props = {
  id: string;
  name: string;
  type: "image" | "video";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({ id, name, type, value, onChange }: Props) => {
  return (
    <label className="cursor-pointer">
      {!value ? (
        <div className="flex flex-col border rounded-2xl p-4 py-10 items-center justify-center gap-2">
          <UploadCloud />
          <p>Click to upload your {name}</p>
          <Input
            id={id}
            name={name}
            type={type}
            //   value={value}
            className="hidden"
            onChange={onChange}
          />
        </div>
      ) : type === "video" ? (
        <video src={value} controls></video>
      ) : (
        <Image src={value} alt={name} width={200} height={200} />
      )}
      <Button size={"icon"}>
        <X />
      </Button>
    </label>
  );
};

export default FileInput;
