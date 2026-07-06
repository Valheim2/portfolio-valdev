import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom est trop long."),
  email: z
    .string()
    .trim()
    .email("Adresse email invalide.")
    .max(150, "L'email est trop long."),
  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères.")
    .max(2000, "Le message est trop long (2000 caractères max)."),
  // Honeypot anti-spam : doit rester vide. Rempli = bot.
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
