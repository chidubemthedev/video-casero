"use client";
import FileInput from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: "",
    thumbnail: "",
    visibility: "public",
  });

  const [error, setError] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | File | null = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      newValue = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      visibility: value,
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Upload a video</h1>
      {error && <p className="text-red-500">{error}</p>}

      <Card className="border-0 shadow-none max-w-2xl mx-auto">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Enter Video Title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter Video Description"
              className="min-h-[100px]"
              onChange={handleChange}
              value={formData.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Video</Label>
            <FileInput
              id="video"
              name="video"
              accept="video/*"
              type="file"
              value={"file"}
              item={formData.video}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <FileInput
              id="thumbnail"
              name="thumbnail"
              type="file"
              accept="image/*"
              value={"file"}
              item={formData.thumbnail}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              defaultValue={formData.visibility}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadPage;
