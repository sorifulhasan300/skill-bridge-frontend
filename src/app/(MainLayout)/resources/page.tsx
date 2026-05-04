"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Lightbulb,
  FileText,
  PlayCircle,
  GraduationCap,
  Target,
  Clock,
  Star,
  ChevronRight,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const studentResources = [
    {
      icon: BookOpen,
      title: "Study Techniques",
      description:
        "Master effective learning strategies and time management skills.",
      items: [
        "Active Recall Methods",
        "Spaced Repetition",
        "Note-Taking Strategies",
      ],
      content: {
        introduction:
          "Effective study techniques can significantly improve your learning outcomes and retention. Here are proven methods backed by educational research.",
        sections: [
          {
            title: "Active Recall Methods",
            content:
              "Active recall involves actively retrieving information from memory rather than passively reviewing notes. This technique strengthens memory pathways and improves long-term retention. Try testing yourself on key concepts before looking at your notes, or use flashcards to quiz yourself regularly.",
          },
          {
            title: "Spaced Repetition",
            content:
              "Instead of cramming all your study time into one session, spread out your review sessions over time. This technique leverages the spacing effect, where information is better retained when learning sessions are spaced apart. Review material at increasing intervals: immediately after learning, then after a day, then after a week, and so on.",
          },
          {
            title: "Note-Taking Strategies",
            content:
              "Effective note-taking goes beyond copying what's written on the board. Use the Cornell method (dividing your page into sections for notes, cues, and summaries) or mind mapping to organize information visually. Focus on capturing main ideas and concepts rather than transcribing everything verbatim.",
          },
        ],
        tips: [
          "Study in short, focused sessions rather than long marathon sessions",
          "Teach concepts to someone else to reinforce your understanding",
          "Use multiple senses when studying (read aloud, draw diagrams, explain concepts)",
          "Get adequate sleep before important study sessions",
        ],
      },
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set achievable academic goals and track your progress.",
      items: ["SMART Goals", "Progress Tracking", "Motivation Tips"],
      content: {
        introduction:
          "Setting clear, achievable goals is fundamental to academic success. Well-defined goals provide direction and motivation for your studies.",
        sections: [
          {
            title: "SMART Goals",
            content:
              "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of 'Get better grades,' set a goal like 'Improve my math grade from B- to A- by the end of the semester by completing all homework and attending tutoring sessions weekly.' This specificity makes your goals more actionable and trackable.",
          },
          {
            title: "Progress Tracking",
            content:
              "Regularly monitor your progress toward your goals. Use a planner or digital app to track assignments, study hours, and grades. Break larger goals into smaller milestones and celebrate achievements along the way. This creates a sense of accomplishment and helps you stay motivated.",
          },
          {
            title: "Motivation Tips",
            content:
              "Maintain motivation by connecting your goals to larger life aspirations. Create a vision board, reward yourself for milestones, and surround yourself with supportive people. Remember that progress, not perfection, is the key to long-term success.",
          },
        ],
        tips: [
          "Write down your goals and review them daily",
          "Break large goals into smaller, manageable tasks",
          "Share your goals with an accountability partner",
          "Focus on the process, not just the outcome",
        ],
      },
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Balance your studies with effective scheduling techniques.",
      items: [
        "Pomodoro Technique",
        "Weekly Planning",
        "Avoiding Procrastination",
      ],
      content: {
        introduction:
          "Effective time management is crucial for balancing academics, extracurricular activities, and personal life. Learn techniques to make the most of your time.",
        sections: [
          {
            title: "Pomodoro Technique",
            content:
              "The Pomodoro Technique involves working in focused 25-minute intervals followed by 5-minute breaks. After four cycles, take a longer 15-30 minute break. This method helps maintain concentration and prevents burnout. Use a timer and commit to working distraction-free during each interval.",
          },
          {
            title: "Weekly Planning",
            content:
              "Create a weekly schedule that allocates time for classes, study sessions, meals, exercise, and relaxation. Use a planner or digital calendar to block out fixed commitments first, then fill in study time. Be realistic about how much you can accomplish each day and build in buffer time for unexpected events.",
          },
          {
            title: "Avoiding Procrastination",
            content:
              "Break the procrastination cycle by starting with small, low-stakes tasks and building momentum. Use the '2-minute rule' - if a task takes less than 2 minutes, do it immediately. Set specific start times for tasks and create accountability by telling others about your plans.",
          },
        ],
        tips: [
          "Prioritize tasks using the Eisenhower Matrix (urgent vs. important)",
          "Limit multitasking and focus on one task at a time",
          "Create a dedicated study environment free from distractions",
          "Build in flexibility for unexpected events",
        ],
      },
    },
  ];

  const tutorResources = [
    {
      icon: Users,
      title: "Teaching Methods",
      description:
        "Learn proven teaching strategies for different learning styles.",
      items: [
        "Differentiated Instruction",
        "Active Learning",
        "Assessment Techniques",
      ],
      content: {
        introduction:
          "Effective teaching requires adapting your methods to different learning styles and student needs. Master these proven strategies to become a more impactful tutor.",
        sections: [
          {
            title: "Differentiated Instruction",
            content:
              "Differentiated instruction involves tailoring your teaching methods to accommodate diverse learning needs. Recognize that students have different learning styles (visual, auditory, kinesthetic) and readiness levels. Provide multiple ways for students to access content, process information, and demonstrate understanding.",
          },
          {
            title: "Active Learning",
            content:
              "Active learning engages students directly in the learning process rather than having them passively receive information. Use techniques like think-pair-share, problem-solving activities, and hands-on demonstrations. Encourage students to explain concepts in their own words and apply knowledge to real-world scenarios.",
          },
          {
            title: "Assessment Techniques",
            content:
              "Effective assessment goes beyond traditional testing. Use formative assessments like exit tickets, observation, and questioning to gauge understanding during lessons. Provide timely, specific feedback that helps students improve. Consider using rubrics and self-assessment to promote metacognition.",
          },
        ],
        tips: [
          "Begin each session with a quick assessment of prior knowledge",
          "Use a variety of teaching methods within each session",
          "Encourage students to reflect on their learning process",
          "Adapt your approach based on student responses and engagement",
        ],
      },
    },
    {
      icon: Lightbulb,
      title: "Engagement Tips",
      description: "Keep students motivated and engaged during sessions.",
      items: [
        "Interactive Activities",
        "Real-world Examples",
        "Feedback Strategies",
      ],
      content: {
        introduction:
          "Student engagement is key to effective learning. Learn strategies to maintain student interest and motivation throughout your tutoring sessions.",
        sections: [
          {
            title: "Interactive Activities",
            content:
              "Incorporate interactive elements to make learning more engaging. Use whiteboards for collaborative problem-solving, educational games, or role-playing scenarios. Break up long explanations with quick activities that require student participation. Technology tools like interactive quizzes can also enhance engagement.",
          },
          {
            title: "Real-world Examples",
            content:
              "Connect abstract concepts to real-world applications to make learning more relevant and memorable. Use current events, personal experiences, or practical applications to illustrate theoretical concepts. Help students see the 'why' behind what they're learning by showing how it applies to their lives and future careers.",
          },
          {
            title: "Feedback Strategies",
            content:
              "Provide constructive, timely feedback that encourages growth. Use the 'sandwich' method (positive-comment-improvement-positive) or focus on specific behaviors rather than personal traits. Help students develop self-assessment skills by asking them to reflect on their work before providing your feedback.",
          },
        ],
        tips: [
          "Start sessions with a hook or interesting question",
          "Vary your pace and activities to maintain attention",
          "Celebrate small victories and progress",
          "Create a positive, supportive learning environment",
        ],
      },
    },
    {
      icon: Star,
      title: "Professional Development",
      description: "Grow your tutoring skills and build your reputation.",
      items: [
        "Communication Skills",
        "Cultural Competence",
        "Continuous Learning",
      ],
      content: {
        introduction:
          "Professional development is essential for tutors who want to excel in their field and build a successful tutoring career. Focus on these key areas to enhance your effectiveness.",
        sections: [
          {
            title: "Communication Skills",
            content:
              "Clear communication is fundamental to effective tutoring. Practice active listening, ask clarifying questions, and explain concepts using appropriate language for your student's level. Develop the ability to read non-verbal cues and adapt your communication style to different personalities and learning preferences.",
          },
          {
            title: "Cultural Competence",
            content:
              "Cultural competence involves understanding and respecting diverse backgrounds, experiences, and perspectives. Learn about different cultural approaches to learning and communication. Create an inclusive environment where all students feel valued and respected, regardless of their background or experiences.",
          },
          {
            title: "Continuous Learning",
            content:
              "Stay current with educational trends, subject matter developments, and teaching methodologies. Participate in professional development workshops, read educational research, and seek feedback from colleagues. Regularly reflect on your teaching practice and identify areas for improvement.",
          },
        ],
        tips: [
          "Seek regular feedback from students and colleagues",
          "Stay updated on educational research and best practices",
          "Network with other educators and share experiences",
          "Set personal professional development goals",
        ],
      },
    },
  ];

  const platformGuides = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      type: "Guide",
      duration: "5 min read",
      content: {
        introduction:
          "Welcome to TutorHub! This comprehensive guide will help you get started on our platform, whether you're a student looking for tutoring or a tutor ready to share your knowledge.",
        steps: [
          {
            title: "Create Your Account",
            content:
              "Sign up for a free account using your email address. Choose whether you're joining as a student or tutor. Complete your profile with accurate information to build trust on the platform.",
          },
          {
            title: "Verify Your Identity",
            content:
              "Upload identification documents and complete any required background checks. This ensures a safe and trustworthy environment for all users.",
          },
          {
            title: "Set Up Your Profile",
            content:
              "Add a professional profile picture, write a compelling bio, and list your subjects of expertise. For tutors, include your qualifications, teaching experience, and hourly rates.",
          },
          {
            title: "Explore the Platform",
            content:
              "Take a tour of the dashboard, browse available tutors (if you're a student) or view potential students (if you're a tutor), and familiarize yourself with booking and communication tools.",
          },
          {
            title: "Complete Your First Session",
            content:
              "Schedule your first tutoring session, prepare materials in advance, and conduct a successful learning experience. Don't forget to leave feedback afterward!",
          },
        ],
        tips: [
          "Use a professional email address for your account",
          "Write a detailed bio highlighting your strengths and teaching approach",
          "Set competitive yet fair pricing for tutoring services",
          "Take advantage of platform features like availability scheduling and messaging",
        ],
      },
    },
    {
      title: "Booking Your First Session",
      description: "Step-by-step booking process",
      type: "Tutorial",
      duration: "3 min read",
      content: {
        introduction:
          "Booking your first tutoring session on TutorHub is simple and straightforward. Follow these steps to connect with expert tutors and start your learning journey.",
        steps: [
          {
            title: "Search for Tutors",
            content:
              "Use our search filters to find tutors by subject, location, availability, ratings, and price range. Read tutor profiles and reviews to find the best match for your learning needs.",
          },
          {
            title: "Check Availability",
            content:
              "View the tutor's weekly schedule and available time slots. Consider your own schedule and time zone when selecting session times.",
          },
          {
            title: "Book Your Session",
            content:
              "Select your preferred date and time, confirm the session details, and complete the booking. You'll receive a confirmation email with session details and meeting instructions.",
          },
          {
            title: "Prepare for Your Session",
            content:
              "Review any materials provided by your tutor, prepare questions or topics you'd like to cover, and ensure you have the necessary technology for virtual sessions.",
          },
          {
            title: "Attend Your Session",
            content:
              "Join the session at the scheduled time using the provided meeting link. Be prepared, engaged, and ready to learn!",
          },
        ],
        tips: [
          "Book sessions during times when you're most alert and focused",
          "Prepare specific goals or questions for each session",
          "Test your video/audio setup before the session begins",
          "Arrive 5 minutes early to ensure everything is working properly",
        ],
      },
    },
    {
      title: "Managing Your Profile",
      description: "Optimize your profile for better visibility",
      type: "Guide",
      duration: "7 min read",
      content: {
        introduction:
          "Your profile is your digital introduction to the TutorHub community. A well-optimized profile attracts the right students or tutors and builds credibility on the platform.",
        sections: [
          {
            title: "Professional Photo",
            content:
              "Choose a clear, professional headshot where you're dressed appropriately and smiling. Your photo should convey approachability and professionalism. Avoid using group photos or images with distracting backgrounds.",
          },
          {
            title: "Compelling Bio",
            content:
              "Write a concise bio that highlights your teaching experience, subject expertise, and unique teaching approach. Include specific achievements, teaching philosophy, and what makes you an effective tutor. Use active language and focus on student benefits.",
          },
          {
            title: "Subject Expertise",
            content:
              "Clearly list all subjects you teach and your proficiency levels. Include grade levels or course types you work with. Be honest about your expertise to set appropriate expectations.",
          },
          {
            title: "Pricing Strategy",
            content:
              "Set competitive rates based on your experience, location, and subject demand. Consider offering package deals for multiple sessions. Clearly communicate what's included in your rate.",
          },
          {
            title: "Availability Settings",
            content:
              "Set your weekly availability accurately to avoid booking conflicts. Update your schedule regularly to reflect changes in your availability.",
          },
          {
            title: "Reviews and Testimonials",
            content:
              "Encourage satisfied students to leave reviews. Respond professionally to all reviews, both positive and constructive. Use feedback to improve your services.",
          },
        ],
        tips: [
          "Update your profile regularly to reflect current information",
          "Highlight unique qualifications or specializations",
          "Use keywords that students might search for",
          "Include examples of successful student outcomes",
        ],
      },
    },
    {
      title: "Payment and Earnings",
      description: "Understanding the payment system",
      type: "Tutorial",
      duration: "4 min read",
      content: {
        introduction:
          "Understanding TutorHub's payment system is essential for both tutors and students. Learn how payments work, when they're processed, and how to manage your earnings.",
        sections: [
          {
            title: "Payment Process",
            content:
              "Students pay for sessions upfront through TutorHub's secure payment system. Funds are held in escrow until the session is completed successfully. This protects both parties and ensures quality service delivery.",
          },
          {
            title: "Tutor Payouts",
            content:
              "Tutors receive payouts after each completed session. Payouts are typically processed within 24-48 hours of session completion. Funds are transferred to your linked bank account or payment method.",
          },
          {
            title: "Platform Fees",
            content:
              "TutorHub charges a service fee for each transaction. The fee structure is transparent and competitive. Tutors keep the majority of their earnings after platform fees are deducted.",
          },
          {
            title: "Payment Methods",
            content:
              "Students can pay using credit cards, debit cards, or digital wallets. Tutors can receive payments via bank transfer, PayPal, or other supported methods depending on their location.",
          },
          {
            title: "Disputes and Refunds",
            content:
              "In rare cases of service issues, TutorHub mediates disputes between students and tutors. Refunds may be issued if sessions cannot be completed due to technical issues or other valid reasons.",
          },
        ],
        tips: [
          "Keep accurate records of all sessions and payments",
          "Communicate clearly about session expectations to avoid disputes",
          "Set up automatic payouts to receive earnings regularly",
          "Monitor your earnings dashboard for payment status updates",
        ],
      },
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#FBFBFB] dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Learning
            <span className="block text-black dark:text-blue-400">
              Resources
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Access comprehensive guides, tips, and tools to enhance your
            learning and teaching experience on TutorHub.
          </p>
        </div>
      </section>

      {/* Student Resources Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              For Students
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Maximize your learning potential with these proven strategies and
              tips
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {studentResources.map((resource, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-[#FBFBFB] dark:bg-slate-800"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <resource.icon className="h-12 w-12 text-black dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-center">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-center">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-slate-700 dark:text-slate-300"
                      >
                        <ChevronRight className="h-4 w-4 text-black dark:text-blue-400 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6 bg-black hover:bg-gray-800 text-white cursor-pointer"
                    onClick={() => setSelectedResource(resource)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutor Resources Section */}
      <section className="py-16 bg-[#FBFBFB] dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              For Tutors
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Enhance your teaching skills and grow your tutoring career
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tutorResources.map((resource, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white dark:bg-slate-700"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <resource.icon className="h-12 w-12 text-black dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-slate-900 dark:text-slate-100 text-center">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-center">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-slate-700 dark:text-slate-300"
                      >
                        <ChevronRight className="h-4 w-4 text-black dark:text-blue-400 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6 bg-black hover:bg-gray-800 text-white cursor-pointer"
                    onClick={() => setSelectedResource(resource)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Guides Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Platform Guides
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Master the TutorHub platform with our comprehensive tutorials and
              guides
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {platformGuides.map((guide, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-[#FBFBFB] dark:bg-slate-800 hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge
                        variant="secondary"
                        className="mb-2 bg-black text-white"
                      >
                        {guide.type}
                      </Badge>
                      <CardTitle className="text-slate-900 dark:text-slate-100 text-lg">
                        {guide.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-300">
                        {guide.description}
                      </CardDescription>
                    </div>
                    <PlayCircle className="h-8 w-8 text-black dark:text-blue-400 flex-shrink-0 ml-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {guide.duration}
                    </span>
                    <Button
                      variant="ghost"
                      className="text-black hover:text-gray-700 p-0 cursor-pointer"
                      onClick={() => setSelectedGuide(guide)}
                    >
                      Read Guide <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Access all our resources and start your learning or teaching journey
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100"
            >
              Browse All Resources
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black"
            >
              Join TutorHub
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Detail Modal */}
      <Dialog
        open={!!selectedResource}
        onOpenChange={() => setSelectedResource(null)}
      >
        <DialogContent className="max-w-6xl w-full max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              {selectedResource?.icon && (
                <selectedResource.icon className="h-8 w-8 text-black" />
              )}
              {selectedResource?.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedResource?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedResource?.content && (
            <div className="space-y-6">
              <div className="bg-[#FBFBFB] p-4 rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  {selectedResource.content.introduction}
                </p>
              </div>

              <div className="space-y-4">
                {selectedResource.content.sections?.map((section, index) => (
                  <div key={index} className="border-l-4 border-black pl-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {selectedResource.content.tips && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    💡 Quick Tips:
                  </h4>
                  <ul className="space-y-2">
                    {selectedResource.content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-black mt-1">•</span>
                        <span className="text-slate-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Guide Detail Modal */}
      <Dialog
        open={!!selectedGuide}
        onOpenChange={() => setSelectedGuide(null)}
      >
        <DialogContent className="max-w-6xl w-full max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <FileText className="h-8 w-8 text-black" />
              {selectedGuide?.title}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-4 text-base">
              <Badge variant="secondary" className="bg-black text-white">
                {selectedGuide?.type}
              </Badge>
              <span className="text-slate-600">{selectedGuide?.duration}</span>
            </DialogDescription>
          </DialogHeader>

          {selectedGuide?.content && (
            <div className="space-y-6">
              <div className="bg-[#FBFBFB] p-4 rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  {selectedGuide.content.introduction}
                </p>
              </div>

              {selectedGuide.content.sections ? (
                <div className="space-y-4">
                  {selectedGuide.content.sections.map((section, index) => (
                    <div key={index} className="border-l-4 border-black pl-4">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {section.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : selectedGuide.content.steps ? (
                <div className="space-y-4">
                  {selectedGuide.content.steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                          {step.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {selectedGuide.content.tips && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    💡 Pro Tips:
                  </h4>
                  <ul className="space-y-2">
                    {selectedGuide.content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-black mt-1">•</span>
                        <span className="text-slate-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
