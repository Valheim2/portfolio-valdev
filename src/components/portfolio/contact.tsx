"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "claudetsanga2@gmail.com",
    href: "mailto:claudetsanga2@gmail.com",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+237 689 39 17 32",
    href: "tel:+237689391732",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Yaoundé, Cameroun",
    href: undefined,
  },
];

export function Contact() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast({
          title: "Message envoyé",
          description: "Merci ! Je vous répondrai dès que possible.",
        });
        reset();
      } else {
        const data = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Échec de l'envoi",
          description: data.error || "Une erreur est survenue. Réessayez.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur réseau",
        description: "Vérifiez votre connexion et réessayez.",
      });
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-border/60">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-brand">Contact</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2">
            Parlons ensemble
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
            Un projet en tête ou simplement envie d&apos;échanger ? Écrivez-moi,
            je réponds avec plaisir.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              {contactInfo.map((item, i) => {
                const content = (
                  <>
                    <div className="p-2.5 rounded-lg bg-brand/10">
                      <item.icon className="h-4 w-4 text-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </>
                );
                return item.href ? (
                  <a key={i} href={item.href} className="flex items-center gap-3 group">
                    {content}
                  </a>
                ) : (
                  <div key={i} className="flex items-center gap-3">
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href="https://github.com/Valheim2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-brand hover:border-brand/50 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-brand hover:border-brand/50 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Honeypot anti-spam : invisible pour les humains. */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                {...register("website")}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Nom</label>
                  <Input placeholder="Votre nom" {...register("name")} />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Décrivez votre projet ou votre demande..."
                  rows={5}
                  className="resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand text-brand-foreground hover:bg-brand/90 gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Envoi…" : "Envoyer le message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
