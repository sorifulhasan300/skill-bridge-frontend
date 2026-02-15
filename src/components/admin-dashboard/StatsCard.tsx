import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsOverview } from "@/types/statistics.type";
import { Users, BookOpen, DollarSign, Activity } from "lucide-react";

interface StatsCardsProps {
  stats: StatsOverview;
}
export const dynamic = "force-dynamic";
export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: `৳${stats.overview.totalRevenue}`,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Active Tutors",
      value: stats.overview.totalTutors,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Bookings",
      value: stats.overview.totalBookings,
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Conversion Rate",
      value: "12.5%",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      {cards?.map((card, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
