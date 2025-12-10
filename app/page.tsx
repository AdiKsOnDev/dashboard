"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Calendar, TrendingUp, Users, Coffee } from "lucide-react";
import { ProjectModal } from "@/components/project-modal";
import { Project } from "@/types";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import experienceData from "@/data/experience.json";

export default function Home() {
  const recentProjects = projectsData.projects.slice(0, 3);
  const currentJob = experienceData.experience.find(exp => exp.current);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project as Project);
    setModalOpen(true);
  };

  return (
    <div className="container max-w-7xl py-8 px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Statistics</h1>
        <p className="text-muted-foreground mt-2">This is my analytical way of displaying who I am</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Experience</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.stats.yearsExperience} Years</div>
            <p className="text-xs text-muted-foreground mt-1">Professional development</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.stats.projectsCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.stats.clientsSatisfied}</div>
            <p className="text-xs text-muted-foreground mt-1">Happy clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Coffee</CardTitle>
            <Coffee className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.stats.coffeeConsumed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Cups consumed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            <CardDescription>A brief introduction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 grayscale">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{profileData.name}</h3>
                <p className="text-muted-foreground">{profileData.title}</p>
                <p className="mt-4 text-sm leading-relaxed">{profileData.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Info</CardTitle>
            <CardDescription>Get in touch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{profileData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{profileData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profileData.location}</span>
            </div>
            <Button className="w-full mt-4">Send Message</Button>
          </CardContent>
        </Card>
      </div>

      {currentJob && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Position</CardTitle>
            <CardDescription>Where I'm working now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{currentJob.position}</h3>
                <p className="text-muted-foreground">{currentJob.company}</p>
                <p className="text-sm text-muted-foreground mt-1">{currentJob.location} • {currentJob.type}</p>
                <p className="mt-3 text-sm">{currentJob.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentJob.technologies.slice(0, 6).map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Latest work highlights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {recentProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors">{project.title}</h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ProjectModal 
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
