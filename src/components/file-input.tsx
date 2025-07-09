import React from "react";
import { Input } from "./ui/input";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

type Props = {
  id: string;
  name: string;
  accept: string;
  value: string;
  item: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({
  id,
  name,
  accept,
  value,
  item,
  type = "file",
  onChange,
}: Props) => {
  return (
    <label className="cursor-pointer">
      {!item ? (
        <div className="flex flex-col border rounded-2xl p-4 py-10 items-center justify-center gap-2">
          <UploadCloud />
          <p>Click to upload your {name}</p>
          <Input
            id={id}
            name={name}
            accept={accept}
            type={type}
            className="hidden"
            onChange={onChange}
          />
        </div>
      ) : (
        <div>
          {type === "video" ? (
            <video src={value} controls></video>
          ) : (
            <Image src={"/file.svg"} alt={name} width={200} height={200} />
          )}
          <Button size={"icon"}>
            <X />
          </Button>
        </div>
      )}
    </label>
  );
};

export default FileInput;
