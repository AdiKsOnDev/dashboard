import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Briefcase, CheckCircle2 } from "lucide-react";
import experienceData from "@/data/content/experience.json";

function formatDate(dateString: string | null) {
  if (!dateString) return "Present";
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function calculateDuration(start: string, end: string | null) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  // Add 1 to make it inclusive (e.g., Jul to Sep = 3 months, not 2)
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                 (endDate.getMonth() - startDate.getMonth()) + 1;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
}

export default function ExperiencePage() {
  return (
    <div className="container max-w-5xl py-8 px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground mt-2">My professional journey and career highlights</p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="space-y-8">
          {experienceData.experience.map((exp, index) => (
            <div key={exp.id} className="relative">
              <div className="absolute left-8 top-6 -translate-x-1/2 hidden md:block">
                <div className={`h-4 w-4 rounded-full border-4 ${
                  exp.current ? 'bg-primary border-primary' : 'bg-background border-border'
                }`} />
              </div>

              <Card className="md:ml-16">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{exp.position}</CardTitle>
                      <CardDescription className="text-base mt-1">{exp.company}</CardDescription>
                    </div>
                    {exp.current && (
                      <Badge className="ml-2">Current</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span>{calculateDuration(exp.startDate, exp.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-sm leading-relaxed">{exp.description}</p>

                  <div>
                    <h4 className="text-sm font-semibold mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {exp.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.technologies.length > 0 && (
                    <>
                      <Separator />

                      <div>
                        <h4 className="text-sm font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
