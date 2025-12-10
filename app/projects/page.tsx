"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Calendar, User, Clock } from "lucide-react";
import projectsData from "@/data/projects.json";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(projectsData.projects.map(p => p.category))];
  
  const filteredProjects = selectedCategory === "all" 
    ? projectsData.projects 
    : projectsData.projects.filter(p => p.category === selectedCategory);

  return (
    <div className="container max-w-7xl py-8 px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground mt-2">A collection of my work and side projects</p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover grayscale transition-all hover:grayscale-0 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="mt-1">{project.client}</CardDescription>
                </div>
                <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{project.longDescription}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4 text-primary" />
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{project.year}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Key Metrics</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-lg bg-muted p-2">
                    <div className="font-semibold">{project.metrics.users}</div>
                    <div className="text-muted-foreground">Users</div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="font-semibold truncate">{project.metrics.performance}</div>
                    <div className="text-muted-foreground">Performance</div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="font-semibold truncate">{project.metrics.impact}</div>
                    <div className="text-muted-foreground">Impact</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                {project.links.live && (
                  <Button size="sm" asChild>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.links.github && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
