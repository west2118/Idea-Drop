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
} from "lucide-react";

export default function PostIdeaPage() {
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
            <form className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title">Idea Title *</Label>
                <Input
                  id="title"
                  placeholder="A clear, concise title for your idea"
                />
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your idea in detail. What problem does it solve? How does it work? What makes it unique?"
                  rows={6}
                />
              </div>

              {/* Tags Field */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    Technology
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Design
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add tags (e.g., Technology, Design)" />
                  <Button type="button" variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="cursor-pointer">
                    <Hash className="h-3 w-3 mr-1" />
                    Business
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    <Hash className="h-3 w-3 mr-1" />
                    Technology
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    <Hash className="h-3 w-3 mr-1" />
                    Art
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    <Hash className="h-3 w-3 mr-1" />
                    Design
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    <Hash className="h-3 w-3 mr-1" />
                    Education
                  </Badge>
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-4">
                <Label>Attachments (Optional)</Label>

                {/* Links */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Paste a link to related resources" />
                    <Button type="button" variant="outline">
                      <Link className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <Input type="file" id="file-upload" className="hidden" />
                  <Label htmlFor="file-upload">
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-slate-300 rounded-md cursor-pointer">
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500">
                          Click to upload images or documents
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>

              {/* Visibility Settings */}
              <div className="space-y-4">
                <Label>Visibility Settings</Label>
                <Tabs defaultValue="public" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="public" className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Public
                    </TabsTrigger>
                    <TabsTrigger value="private" className="flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Private
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="public"
                    className="p-4 border rounded-b-md border-t-0">
                    <p className="text-sm text-slate-600">
                      Your idea will be visible to everyone in the IdeaDrop
                      community. You'll receive feedback and votes from all
                      users.
                    </p>
                  </TabsContent>
                  <TabsContent
                    value="private"
                    className="p-4 border rounded-b-md border-t-0">
                    <p className="text-sm text-slate-600">
                      Your idea will be private and only visible to people you
                      invite. You can collaborate with selected individuals.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="px-8">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Drop Idea
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">
              Tips for a Great Idea Post
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                •
              </div>
              <p className="text-sm text-slate-600 ml-2">
                Be clear and specific about your idea
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                •
              </div>
              <p className="text-sm text-slate-600 ml-2">
                Explain the problem you're solving
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                •
              </div>
              <p className="text-sm text-slate-600 ml-2">
                Add relevant tags to help others find your idea
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                •
              </div>
              <p className="text-sm text-slate-600 ml-2">
                Include visual references if possible
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
