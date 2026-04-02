"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(200, "Please keep your name under 200 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  company: z
    .string()
    .trim()
    .max(200, "Please keep the company name under 200 characters."),
  help: z
    .string()
    .trim()
    .min(1, "Please tell us how we can help.")
    .max(5000, "Please keep your message under 5000 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const demoExpectations = [
  "Map out your current design workflows and identify delivery bottlenecks.",
  "Identify opportunities to resolve these within the platform.",
  "Personalised run-through of the platform from someone who understands construction first-hand.",
  "Answer product, design, or construction-related questions",
] as const;

const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ?? "";

const inputClassName =
  "h-12 w-full rounded-2xl border-foreground/12 bg-background/80 px-4 text-sm leading-6 text-foreground shadow-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-foreground/30 focus-visible:ring-foreground/10 sm:text-[0.95rem]";

const textareaClassName =
  "min-h-[150px] w-full rounded-2xl border-foreground/12 bg-background/80 px-4 py-3 text-sm leading-6 text-foreground shadow-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-foreground/30 focus-visible:ring-foreground/10 sm:min-h-[170px] sm:text-[0.95rem]";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-destructive">
      *
    </span>
  );
}

function GradientCheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#001820_0%,#019DBF_100%)]">
      <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
    </span>
  );
}

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
  });
  const sectionRef = useRef<HTMLElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      help: "",
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const subscription = form.watch(() => {
      setSubmissionState((current) =>
        current.status === "idle" || current.status === "submitting"
          ? current
          : { status: "idle" }
      );
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!formspreeEndpoint) {
      setSubmissionState({
        status: "error",
        message:
          "The contact form is not configured yet. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT before deploying.",
      });
      return;
    }

    setSubmissionState({ status: "submitting" });

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.trim());
    });

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setSubmissionState({
          status: "success",
          message:
            "Thanks. Your demo request has been sent and we will get back to you shortly.",
        });
        return;
      }

      if (response.status === 429) {
        setSubmissionState({
          status: "error",
          message:
            "Too many attempts were made in a short period. Please wait a moment and try again.",
        });
        return;
      }

      const payload = (await response.json().catch(() => null)) as
        | { errors?: Array<{ message?: string }> }
        | null;

      const errorMessage =
        payload?.errors
          ?.map((error) => error.message)
          .filter(Boolean)
          .join(" ") ||
        "There was a problem sending your request. Please try again or email us directly.";

      setSubmissionState({ status: "error", message: errorMessage });
    } catch {
      setSubmissionState({
        status: "error",
        message:
          "There was a network problem sending your request. Please try again or email us directly.",
      });
    }
  });

  const isConfigured = Boolean(formspreeEndpoint);
  const isSubmitting = form.formState.isSubmitting;

  return (
    <section id="contact" ref={sectionRef} className="site-section overflow-hidden">
      <div className="site-shell">
        <div
          className={cn(
            "relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-foreground/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(236,244,245,0.92))] transition-all duration-1000",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(72,222,220,0.18),transparent_28%),linear-gradient(145deg,transparent_0%,transparent_62%,rgba(0,24,32,0.04)_62.2%,transparent_62.8%)]" />

          <div className="relative z-10 grid gap-8 px-5 py-6 sm:px-6 sm:py-8 lg:gap-10 lg:px-8 lg:py-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] xl:items-start xl:gap-12 xl:px-10 xl:py-10">
            <div className="min-w-0 max-w-2xl">
              <span className="site-kicker">
                Contact
              </span>

              <h1 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight sm:text-4xl xl:text-5xl">
                <span className="font-semibold text-gradient-heading">
                  Heres what to expect
                </span>
                <span className="block font-medium text-muted-foreground">
                  from your demo
                </span>
              </h1>

              <ul className="site-followup max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem] lg:text-base">
                {demoExpectations.map((item) => (
                  <li key={item} className="flex items-start gap-3 sm:gap-4">
                    <span className="mt-0.5">
                      <GradientCheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="site-outro flex flex-col items-stretch gap-4 sm:items-start">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-foreground/20 px-5 text-center text-sm font-medium transition-colors hover:bg-foreground/5 sm:inline-flex sm:w-auto sm:px-7"
                >
                  <Mail className="h-4 w-4" />
                  <span className="break-all sm:break-normal">{siteConfig.email}</span>
                </a>
              </div>
            </div>

            <div className="min-w-0 rounded-[1.5rem] border border-foreground/10 bg-background/75 px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6 xl:ml-auto xl:w-full">
              <div className="mb-5 sm:mb-6">
                <span className="site-label">
                  Tell us a little about your team
                </span>
              </div>

              {!isConfigured && (
                <Alert
                  variant="destructive"
                  className="mb-6 rounded-2xl border-destructive/20 bg-destructive/5"
                >
                  <AlertCircle className="mt-0.5" />
                  <AlertTitle>Formspree endpoint required</AlertTitle>
                  <AlertDescription>
                    Add <code>NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> to your
                    environment with your Formspree form endpoint before going
                    live.
                  </AlertDescription>
                </Alert>
              )}

              {submissionState.status === "success" && (
                <Alert className="mb-6 rounded-2xl border-foreground/10 bg-foreground/[0.02]">
                  <CheckCircle2 className="mt-0.5 text-foreground" />
                  <AlertTitle>Request sent</AlertTitle>
                  <AlertDescription>{submissionState.message}</AlertDescription>
                </Alert>
              )}

              {submissionState.status === "error" && (
                <Alert
                  variant="destructive"
                  className="mb-6 rounded-2xl border-destructive/20 bg-destructive/5"
                >
                  <AlertCircle className="mt-0.5" />
                  <AlertTitle>Unable to send request</AlertTitle>
                  <AlertDescription>{submissionState.message}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form
                  action={isConfigured ? formspreeEndpoint : undefined}
                  method="POST"
                  noValidate
                  onSubmit={onSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="gap-3">
                          <FormLabel className="site-label text-foreground/68">
                            NAME <RequiredMark />
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="name"
                              className={inputClassName}
                              disabled={isSubmitting}
                              placeholder="Jane Smith"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="gap-3">
                          <FormLabel className="site-label text-foreground/68">
                            EMAIL <RequiredMark />
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="email"
                              className={inputClassName}
                              disabled={isSubmitting}
                              placeholder="jane@company.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem className="gap-3 md:col-span-2">
                          <FormLabel className="site-label text-foreground/68">
                            COMPANY
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="organization"
                              className={inputClassName}
                              disabled={isSubmitting}
                              placeholder="Company name"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="help"
                    render={({ field }) => (
                      <FormItem className="gap-3">
                        <FormLabel className="site-label text-foreground/68">
                          HOW CAN WE HELP? <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className={textareaClassName}
                            disabled={isSubmitting}
                            placeholder="Tell us about your project, design workflow, or what you want to explore in the demo."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col items-start gap-3 pt-1 sm:gap-4">
                    <p className="max-w-full text-sm leading-relaxed text-muted-foreground">
                      We only use the details you share here to respond to your
                      enquiry.
                    </p>

                    <Button
                      type="submit"
                      className="btn-gradient h-12 self-start rounded-full px-7 text-sm font-semibold shadow-none hover:shadow-none"
                      disabled={isSubmitting || !isConfigured}
                    >
                      {submissionState.status === "submitting" ? (
                        <>
                          <Spinner className="size-4" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Request Demo
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
