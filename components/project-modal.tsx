"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Calendar, User, Clock, TrendingUp } from "lucide-react";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{project.title}</DialogTitle>
              <DialogDescription className="mt-2">{project.client}</DialogDescription>
            </div>
            <Badge variant={project.status === "completed" ? "default" : "secondary"}>
              {project.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold mb-2">About This Project</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>
          </div>

          <Separator />

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium">{project.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-medium">{project.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Year</p>
                <p className="font-medium">{project.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium">{project.category}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Key Metrics */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Key Metrics</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground mb-1">Users</p>
                <p className="font-semibold">{project.metrics.users}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground mb-1">Performance</p>
                <p className="font-semibold text-sm">{project.metrics.performance}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground mb-1">Impact</p>
                <p className="font-semibold text-sm">{project.metrics.impact}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Technologies */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.links.live || project.links.github) && (
            <>
              <Separator />
              <div className="flex gap-3">
                {project.links.live && (
                  <Button asChild className="flex-1">
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.links.github && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
