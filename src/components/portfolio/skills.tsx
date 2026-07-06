"use client";

import { motion } from "framer-motion";
import { Layout, Server, GitBranch, Database } from "lucide-react";

const categories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["HTML / CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Java", "Spring Boot", "Express.js", "Python (Django)", "REST API"],
  },
  {
    title: "Outils & DevOps",
    icon: GitBranch,
    skills: ["Git / GitHub", "Docker"],
  },
  {
    title: "Bases de données",
    icon: Database,
    skills: ["SQL", "ORM"],
  },
];

export function Skills() {
  return (
    <section id="competences" className="py-24 border-t border-border/60">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-brand">Compétences</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2">
            Ce que j&apos;utilise
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-lg border border-border p-6"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <category.icon className="h-5 w-5 text-brand" />
                <h3 className="font-medium">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1 rounded-full border border-border text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
