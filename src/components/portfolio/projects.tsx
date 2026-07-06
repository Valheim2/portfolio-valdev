"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Check } from "lucide-react";

const projects = [
  {
    title: "Bubbles — visioconférence",
    description:
      "Application de visioconférence locale avec gestion des salles et des participants. Backend Spring Boot, frontend Next.js.",
    tags: ["Spring Boot", "Next.js"],
    status: "Terminé",
  },
  {
    title: "Gestion de produits (magasin)",
    description:
      "Application web de gestion des produits d'un magasin avec un backend Spring Boot et un frontend Next.js.",
    tags: ["Spring Boot", "Next.js"],
  },
  {
    title: "API d'authentification JWT",
    description:
      "API REST Spring Boot pour la gestion des utilisateurs avec authentification sécurisée par JWT.",
    tags: ["Spring Boot", "JWT", "REST"],
  },
  {
    title: "API d'analyse de sentiments",
    description:
      "API REST Spring Boot permettant de gérer et d'analyser les sentiments des utilisateurs.",
    tags: ["Spring Boot", "REST"],
  },
  {
    title: "Gestion des interventions FTTH",
    description:
      "Application web optimisant le processus d'intervention des techniciens FTTH du CERAF (CAMTEL). Projet académique.",
    tags: ["Django", "Python", "React"],
  },
  {
    title: "Ventes d'iPhones, quizz & hébergement",
    description:
      "Boutique de vente d'iPhones, quizz dynamique et mini-site d'hébergement.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

export function Projects() {
  return (
    <section id="projets" className="py-24 border-t border-border/60">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-brand">Projets</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2">
            Mes réalisations
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-lg border border-border p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-medium">{project.title}</h3>
                {project.status && (
                  <span className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand">
                    <Check className="h-3 w-3" /> {project.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Lien vers GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-lg border border-dashed border-border p-6 flex flex-col items-start justify-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Retrouvez l&apos;ensemble de mon code et de mes projets sur GitHub.
            </p>
            <Button variant="outline" className="gap-2" asChild>
              <a
                href="https://github.com/Valheim2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" /> Voir mon GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
