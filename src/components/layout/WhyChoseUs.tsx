import { ShieldCheck, Zap, Users, Star } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Verified Instructors",
      description: "Rigorous background checks and academic verification.",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    },
    {
      title: "Instant Booking",
      description: "See live slots and book your session in seconds.",
      icon: <Zap className="w-5 h-5 text-primary" />,
    },
    {
      title: "1-on-1 Attention",
      description: "Personalized experience tailored to your pace.",
      icon: <Users className="w-5 h-5 text-primary" />,
    },
    {
      title: "Quality Guaranteed",
      description: "Honest reviews from thousands of students.",
      icon: <Star className="w-5 h-5 text-primary" />,
    },
  ];

  const stats = [
    { label: "Success Rate", value: "98%" },
    { label: "Verified Tutors", value: "10k+" },
    { label: "Avg. Rating", value: "4.9/5" },
    { label: "Live Support", value: "24/7" },
  ];

  return (
    <section className="py-24 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-10/12 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by thousands of students worldwide
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                We provide a secure and efficient environment for both students
                and tutors to excel.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                  <div className="space-y-1">
                    <h4 className="font-medium leading-none">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Minimalist Stats Grid */}
          <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden shadow-sm">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card p-10 flex flex-col items-center justify-center text-center space-y-1"
              >
                <span className="text-4xl font-bold tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
