"use client";
import FileInput from "@/components/file-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useFileInput } from "@/lib/hooks/useFileInput";
import React, { useState } from "react";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "../../../../constants";
import { Loader } from "lucide-react";

const UploadPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: "",
    thumbnail: "",
    visibility: "public",
  });

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const [error, setError] = useState("s");

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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload both video and thumbnail");
        return;
      }

      if (!formData.title || !formData.description) {
        setError("Please fill in all required fields");
        return;
      }

      // upload the video to bunny
      // unload the thumbnail to db
      // Attach thumbnail
      // Create a new db entry for the video details (url, metadata)
    } catch (error) {
      console.log("Error submitting video", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Card className="border-0 shadow-none max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Upload Video</CardTitle>
          {error && <p className="text-red-500">{error}</p>}
        </CardHeader>
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
              type="video"
              previewUrl={formData.video}
              onChange={handleChange}
              onReset={video.resetFile}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <FileInput
              id="thumbnail"
              name="thumbnail"
              type="image"
              accept="image/*"
              previewUrl={formData.thumbnail}
              onChange={handleChange}
              onReset={thumbnail.resetFile}
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
          <Button onClick={handleSubmit} className="w-full" size={"lg"}>
            {isSubmitting ? (
              <Loader className="animate-spin w-4 h-4" />
            ) : (
              "Upload Video"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadPage;
