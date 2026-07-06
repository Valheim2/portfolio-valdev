"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Layout, Server, Wrench } from "lucide-react";

const focus = [
  {
    icon: Layout,
    title: "Frontend",
    text: "Interfaces réactives et accessibles avec Next.js, React et TypeScript.",
  },
  {
    icon: Server,
    title: "Backend",
    text: "APIs robustes et sécurisées avec Spring Boot et Java.",
  },
  {
    icon: Wrench,
    title: "Outils",
    text: "Git, Docker et bases de données SQL pour livrer proprement.",
  },
];

export function About() {
  return (
    <section id="apropos" className="py-24 border-t border-border/60">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-brand">À propos</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2">
            Qui suis-je
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex md:justify-center"
          >
            <Avatar className="h-32 w-32 border border-border">
              <AvatarImage src="/avatar.png" alt="Claude Girardet" />
              <AvatarFallback className="text-2xl font-semibold bg-brand/10 text-brand">
                CG
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed">
              Je suis{" "}
              <span className="text-foreground font-medium">
                TSANGA NGA Claude Girardet
              </span>
              , étudiant en 3<sup>e</sup> année de Génie Logiciel (IGL) à
              l&apos;Institut Supérieur HINTEL, à Yaoundé. Passionné par le web et
              le développement de solutions innovantes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              J&apos;ai de l&apos;expérience dans le développement d&apos;applications
              web, du frontend Next.js au backend Spring Boot. J&apos;aime le code
              propre et bien structuré, et j&apos;apprends rapidement de nouvelles
              technologies.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {focus.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-lg border border-border p-5"
            >
              <f.icon className="h-5 w-5 text-brand mb-3" />
              <h3 className="font-medium mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
