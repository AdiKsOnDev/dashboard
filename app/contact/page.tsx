import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock
} from "lucide-react";
import profileData from "@/data/profile.json";
import contactData from "@/data/contact.json";

export default function ContactPage() {
  return (
    <div className="container max-w-5xl py-8 px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Get In Touch</h1>
        <p className="text-muted-foreground mt-2">Let's discuss your next project</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How to reach me</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href={`mailto:${profileData.email}`} className="text-sm text-muted-foreground hover:text-primary">
                    {profileData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href={`tel:${profileData.phone}`} className="text-sm text-muted-foreground hover:text-primary">
                    {profileData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{profileData.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Working Hours</p>
                  <p className="text-sm text-muted-foreground">{contactData.workingHours.hours}</p>
                  <p className="text-xs text-muted-foreground">{contactData.workingHours.timezone}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button asChild>
                <a href={`mailto:${profileData.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
            <CardDescription>Current status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <Badge variant="outline" className="capitalize">
                {contactData.availability.status}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{contactData.availability.message}</p>
            <div className="rounded-lg bg-muted p-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Response time: {contactData.availability.responseTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
