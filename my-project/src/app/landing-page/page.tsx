import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Lightbulb,
  Users,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ThumbsUp,
  Heart,
} from "lucide-react";

export default function LandingPage() {
  // Mock data for trending ideas
  const trendingIdeas = [
    {
      id: 1,
      title: "AI-Powered Recycling System",
      description:
        "Smart bins that automatically sort recyclables using computer vision",
      upvotes: 245,
      comments: 32,
    },
    {
      id: 2,
      title: "Community Skill Exchange Platform",
      description:
        "Local platform for trading skills and knowledge without monetary exchange",
      upvotes: 189,
      comments: 41,
    },
    {
      id: 3,
      title: "Modular Urban Gardening System",
      description: "Space-efficient gardening solutions for apartment dwellers",
      upvotes: 176,
      comments: 28,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "UX Designer",
      content:
        "IdeaDrop helped me refine my app concept and connect with developers who helped bring it to life. The feedback I received was invaluable!",
      avatar: "AJ",
    },
    {
      id: 2,
      name: "Samantha Lee",
      role: "Social Entrepreneur",
      content:
        "Through IdeaDrop, I found collaborators for my community project and received resources that helped us secure funding. This platform is amazing!",
      avatar: "SL",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "As someone who loves building but doesn't always have ideas, IdeaDrop has been a goldmine for finding exciting projects to contribute to.",
      avatar: "MC",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Share Your Ideas. Get Feedback. Build Together.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A dedicated space to share your creative ideas, get valuable
            feedback, find collaborators, and turn your visions into reality.
          </p>
          <div className="flex space-x-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 bg-blue-50 rounded-xl flex items-center justify-center">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-100 rounded-lg rotate-12 flex flex-col items-center justify-center p-4 shadow-md">
              <Lightbulb className="h-8 w-8 text-yellow-500 mb-2" />
              <p className="text-xs font-medium text-center">Business Idea</p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-100 rounded-lg -rotate-6 flex flex-col items-center justify-center p-4 shadow-md">
              <Sparkles className="h-8 w-8 text-green-600 mb-2" />
              <p className="text-xs font-medium text-center">
                Creative Concept
              </p>
            </div>
            <div className="absolute top-1/2 -right-8 w-32 h-32 bg-purple-100 rounded-lg rotate-6 flex flex-col items-center justify-center p-4 shadow-md">
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <p className="text-xs font-medium text-center">Collaborate</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <Lightbulb className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
                <CardTitle>Drop Your Idea</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Share your idea in any category - business, tech, art, or
                  social initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageSquare className="h-7 w-7 text-green-600" />
                  </div>
                </div>
                <CardTitle>Get Feedback & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Receive constructive feedback, votes, and suggestions from the
                  community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="h-7 w-7 text-purple-600" />
                  </div>
                </div>
                <CardTitle>Collaborate & Build</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Connect with potential collaborators and resources to bring
                  your idea to life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Ideas Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Trending Ideas</h2>
            <Button variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingIdeas.map((idea) => (
              <Card
                key={idea.id}
                className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{idea.title}</CardTitle>
                  <CardDescription>{idea.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{idea.upvotes} votes</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{idea.comments} comments</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold">
                      {testimonial.avatar}
                    </div>
                  </div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-lg mb-8">
            Join our community of innovators and creators today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-slate-100">
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-700">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">IdeaDrop</span>
              </div>
              <p className="text-slate-400">Where ideas grow together.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Examples</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>GDPR</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-slate-500">
            <p>© 2023 IdeaDrop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
