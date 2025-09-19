import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Lightbulb,
  ThumbsUp,
  MessageSquare,
  Users,
  Share,
  Bookmark,
  MoreHorizontal,
  Clock,
  Eye,
} from "lucide-react";

export default function IdeaDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Idea Header */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200">
                  Technology
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-3xl">
                AI-Powered Recycling System
              </CardTitle>
              <CardDescription className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <span>Alex Johnson</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Posted 2 days ago</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>245 views</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Idea Description */}
              <div className="prose max-w-none">
                <p className="text-lg">
                  Smart bins that automatically sort recyclables using computer
                  vision and machine learning to improve recycling efficiency
                  and reduce contamination in recycling streams.
                </p>

                <h3 className="text-2xl font-semibold mt-6 mb-3">
                  How It Works
                </h3>
                <p className="text-lg">
                  The system uses cameras and sensors to identify different
                  types of materials (plastic, glass, paper, metal) as they are
                  disposed of. A machine learning algorithm classifies each item
                  and directs it to the appropriate compartment within the bin.
                </p>

                <h3 className="text-2xl font-semibold mt-6 mb-3">Benefits</h3>
                <ul className="list-disc pl-5">
                  <li className="text-lg">
                    Reduces recycling contamination by up to 80%
                  </li>
                  <li className="text-lg">
                    Increases recycling rates through better sorting
                  </li>
                  <li className="text-lg">
                    Provides data analytics on recycling patterns
                  </li>
                  <li className="text-lg">
                    Educational component helps users learn proper recycling
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold mt-6 mb-3">Next Steps</h3>
                <p className="text-lg">
                  I'm looking for collaborators with expertise in computer
                  vision, hardware design, and environmental science to help
                  develop a prototype and pilot program.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="secondary">AI</Badge>
                <Badge variant="secondary">Machine Learning</Badge>
                <Badge variant="secondary">Sustainability</Badge>
                <Badge variant="secondary">Recycling</Badge>
                <Badge variant="secondary">Computer Vision</Badge>
                <Badge variant="secondary">IoT</Badge>
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>124</span>
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>18</span>
                    </Button>
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  <Users className="h-4 w-4 mr-2" />
                  Join This Idea
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Discussion (18)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* New Comment Form */}
              <div className="flex space-x-4">
                <Avatar>
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add your comment or feedback..."
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button>Post Comment</Button>
                  </div>
                </div>
              </div>

              {/* Comment Thread */}
              <div className="space-y-6 pt-6">
                {/* Comment 1 */}
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-slate-100 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">Michael Johnson</h4>
                        <span className="text-sm text-slate-500">
                          1 day ago
                        </span>
                      </div>
                      <p className="text-slate-700">
                        This is a fantastic idea! I work in waste management and
                        can confirm that contamination is a huge issue. Have you
                        considered how to handle different types of plastics
                        that look similar?
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 ml-4">
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />5
                      </Button>
                    </div>

                    {/* Reply */}
                    <div className="flex space-x-4 mt-4 ml-6">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">
                              Alex Johnson (Author)
                            </h4>
                            <span className="text-sm text-slate-500">
                              20 hours ago
                            </span>
                          </div>
                          <p className="text-slate-700">
                            Great question! We're experimenting with
                            spectroscopy to distinguish between similar-looking
                            plastics based on their chemical signatures.
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 ml-4">
                          <Button variant="ghost" size="sm">
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />3
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment 2 */}
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-slate-100 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">Sarah Lee</h4>
                        <span className="text-sm text-slate-500">
                          15 hours ago
                        </span>
                      </div>
                      <p className="text-slate-700">
                        I'm a hardware engineer with experience in IoT devices.
                        Would love to collaborate on the sensor and mechanical
                        sorting mechanism design!
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 ml-4">
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />7
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Author Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About the Author</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-lg">AJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Alex Johnson</h3>
                  <p className="text-sm text-slate-600">
                    Environmental Engineer
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Passionate about using technology to solve environmental
                challenges. Previously worked on water purification systems.
              </p>
              <div className="flex items-center text-sm text-slate-500">
                <Lightbulb className="h-4 w-4 mr-1" />
                <span>12 ideas shared</span>
              </div>
              <Button variant="outline" className="w-full">
                Follow Author
              </Button>
            </CardContent>
          </Card>

          {/* Related Ideas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Ideas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Smart Composting System</h4>
                <p className="text-sm text-slate-600 line-clamp-2">
                  IoT-enabled compost bins that monitor temperature, moisture,
                  and composition.
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>45 votes</span>
                  <span>8 comments</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium">Ocean Plastic Collection Drone</h4>
                <p className="text-sm text-slate-600 line-clamp-2">
                  Autonomous drones that identify and collect plastic waste from
                  ocean surfaces.
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>87 votes</span>
                  <span>14 comments</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium">Textile Recycling Innovation</h4>
                <p className="text-sm text-slate-600 line-clamp-2">
                  New process for breaking down blended fabrics into reusable
                  fibers.
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>32 votes</span>
                  <span>6 comments</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                View More Related Ideas
              </Button>
            </CardContent>
          </Card>

          {/* Collaboration Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Status</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700">
                    Open
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Looking For</span>
                  <span className="text-sm">
                    AI Engineers, Hardware Designers
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Team Members</span>
                  <span className="text-sm">3 joined</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
