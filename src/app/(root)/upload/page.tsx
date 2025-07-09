"use client";
import FileInput from "@/components/file-input";
import FormField from "@/components/form-field";
import { Card, CardContent } from "@/components/ui/card";
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
    video: null,
    thumbnail: null,
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

      <Card className="border-0 shadow-none">
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
            <Input
              id="video"
              name="video"
              type="file"
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
      </Card>
    </div>
  );
};

export default UploadPage;
