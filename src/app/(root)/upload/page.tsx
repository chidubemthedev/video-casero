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
import React, { useEffect, useState } from "react";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "../../../../constants";
import { Loader } from "lucide-react";
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from "@/lib/actions/video";
import { useRouter } from "next/navigation";

const uploadFileToBunny = (
  file: File,
  uploadUrl: string,
  accessKey: string
): Promise<void> => {
  return fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to upload file to bunny");
    }
  });
};

const UploadPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    video: File | null;
    thumbnail: File | null;
    visibility: "public" | "private";
  }>({
    title: "",
    description: "",
    video: null,
    thumbnail: null,
    visibility: "public",
  });

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const [error, setError] = useState("");
  const [videoDuration, setVideoDuration] = useState<number | null>(0);

  useEffect(() => {
    if (video.duration !== null || 0) {
      setVideoDuration(video.duration);
    }
  }, [video.duration]);

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

  const handleSelectChange = (value: "public" | "private") => {
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

      // get upload url
      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();

      if (!videoUploadUrl || !videoAccessKey)
        throw new Error("Failed to get video upload credentails");

      // upload the video to bunny
      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      // upload the thumbnail to db
      const {
        uploadUrl: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
      } = await getThumbnailUploadUrl(videoId);

      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl)
        throw new Error("Failed to get thumbnail upload credentails");

      // upload the thumbnail to bunny
      await uploadFileToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey
      );

      // Create a new db entry for the video details (url, metadata)
      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration,
      });

      router.push(`/video/${videoId}`);
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
              previewUrl={video.previewUrl}
              onChange={video.handleFileChange}
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
              previewUrl={thumbnail.previewUrl}
              onChange={thumbnail.handleFileChange}
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
