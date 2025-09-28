"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Link,
  Image,
  Upload,
  Globe,
  Lock,
  Hash,
  X,
  Loader,
} from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { listCategories } from "@/constants/categories";
import { listTags } from "@/constants/tags";
import { handleAdd, handleSelected } from "@/lib/utils";
import TipsCard from "@/components/app/TipsCard";
import ImageUpload from "@/components/app/ImageUploader";
import { useImageUploader } from "@/hooks/useImageUploader";
import { visibilityTypes } from "@/constants/visibility";
import axios from "axios";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const categoryLimit = 2;
const tagLimit = 5;

type FormData = {
  title: string;
  description: string;
  works: string;
  benefits: string;
  conclusion: string;
};

type ImageType = "attachment";

export default function PostIdeaPage() {
  const router = useRouter();
  const token = useUserStore((state) => state.userToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibility, setVisibility] = useState("public");
  const [categoryAdd, setCategoryAdd] = useState("");
  const [tagAdd, setTagAdd] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const { formData, handleChange } = useForm<FormData>({
    title: "",
    description: "",
    works: "",
    benefits: "",
    conclusion: "",
  });

  const { images, handleImageChange, handleUploadImages } =
    useImageUploader<ImageType>(["attachment"]);

  const handleCategoryAdd = () => {
    handleAdd(categoryAdd, setCategoryAdd, setCategories, categoryLimit);
  };

  const handleTagAdd = () => {
    handleAdd(tagAdd, setTagAdd, setTags, tagLimit);
  };

  const handleCategory = (category: string) =>
    handleSelected(category, setCategories, categoryLimit);

  const handleTag = (tag: string) => handleSelected(tag, setTags, tagLimit);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    let imageUrls = [];

    imageUrls = (await handleUploadImages()) ?? [];

    const newData: any = {
      title: formData.title,
      categories,
      visibility,
      tags,
      content: {
        description: formData.description,
        works: formData.works,
        benefits: formData.benefits,
        conclusion: formData.conclusion,
      },
    };

    if (imageUrls.length > 0 && imageUrls[0].url) {
      newData.attachment = imageUrls[0].url;
    }

    try {
      const response = await axios.post(
        "/api/idea/postIdea",
        { ...newData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      router.push("/dashboard");
      toast.success(response?.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center space-x-2 mb-6">
          <Lightbulb className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Drop Your Idea</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share Your Idea with the Community</CardTitle>
            <CardDescription>
              Fill in the details below to share your idea. The more detailed
              your idea, the better feedback you'll receive.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label>Idea Title *</Label>
                <Input
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                  id="title"
                  placeholder="A clear, concise title for your idea"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="px-2 py-1 flex items-center space-x-2">
                        <span className="m-0">{category}</span>
                        <button
                          onClick={() =>
                            setCategories((prev) =>
                              prev.filter((item) => item !== category)
                            )
                          }
                          type="button"
                          className="flex items-center justify-center w-5 h-5">
                          <X className="w-3 h-3 text-gray-600" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    onChange={(e) => setCategoryAdd(e.target.value)}
                    placeholder="Add category (e.g., Technology, Design)"
                  />
                  <Button
                    onClick={handleCategoryAdd}
                    type="button"
                    variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {listCategories.map((category) => (
                    <Button
                      type="button"
                      key={category}
                      onClick={() => handleCategory(category)}
                      variant={
                        categories.includes(category) ? "default" : "outline"
                      }
                      className="cursor-pointer">
                      <Hash className="h-3 w-3" />
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  id="description"
                  placeholder="Describe your idea in detail. What problem does it solve? How does it work? What makes it unique?"
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="how-it-works">How It Works *</Label>
                <Textarea
                  name="works"
                  onChange={handleChange}
                  value={formData.works}
                  id="how-it-works"
                  placeholder="Describe how your solution works in detail. What technologies are involved? How does it solve the problem?"
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits *</Label>
                <Textarea
                  name="benefits"
                  onChange={handleChange}
                  value={formData.benefits}
                  id="benefits"
                  placeholder="List the benefits of your idea, separated by commas. Example: Reduces costs, Increases efficiency, Positive environmental impact, User-friendly"
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uniqueness">Conclusion *</Label>
                <Textarea
                  name="conclusion"
                  onChange={handleChange}
                  value={formData.conclusion}
                  id="uniqueness"
                  placeholder="Describe how your idea is unique and what differentiates it from existing solutions."
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* Tags Field */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags *</Label>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-2 py-1 flex items-center space-x-2">
                        <span className="m-0">{tag}</span>
                        <button
                          onClick={() =>
                            setTags((prev) =>
                              prev.filter((item) => item !== tag)
                            )
                          }
                          type="button"
                          className="flex items-center justify-center w-5 h-5">
                          <X className="w-3 h-3 text-gray-600" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    onChange={(e) => setTagAdd(e.target.value)}
                    placeholder="Add tags (e.g., Technology, Design)"
                  />
                  <Button
                    onClick={handleTagAdd}
                    type="button"
                    variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {listTags.map((tag) => (
                    <Button
                      type="button"
                      key={tag}
                      onClick={() => handleTag(tag)}
                      variant={tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer">
                      <Hash className="h-3 w-3" />
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              <div className="w-full">
                <ImageUpload
                  label="Attachment (Optional)"
                  imageData={images.attachment}
                  onChangeImage={handleImageChange}
                  name="attachment"
                />
              </div>

              {/* Visibility Settings */}
              <div className="space-y-4">
                <Label>Visibility Settings</Label>
                <div className="w-full">
                  <div className="flex space-x-4">
                    {visibilityTypes.map((type) => (
                      <Button
                        type="button"
                        key={type.value}
                        onClick={() => setVisibility(type.value)}
                        variant={
                          visibility === type.value ? "default" : "outline"
                        }>
                        <type.icon className="h-4 w-4 inline" />
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between align-center pt-4">
                <Button
                  disabled={isLoading}
                  type="button"
                  size="lg"
                  variant="outline"
                  className="px-8">
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  type="submit"
                  size="lg"
                  className="px-8">
                  {isLoading ? (
                    <Loader className="animate-spin h-5 w-5" />
                  ) : (
                    <Lightbulb className="h-5 w-5" />
                  )}
                  Drop Idea
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <TipsCard />
      </div>
    </div>
  );
}
