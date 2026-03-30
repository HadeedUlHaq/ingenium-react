"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
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

const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
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
  phone: z
    .string()
    .trim()
    .max(50, "Please keep the phone number under 50 characters."),
  subject: z
    .string()
    .trim()
    .min(1, "Please enter a subject.")
    .max(200, "Please keep the subject under 200 characters."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your message.")
    .max(5000, "Please keep the message under 5000 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ?? "";

const inputClassName =
  "h-12 rounded-none border-foreground/12 bg-background/70 px-4 text-sm shadow-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-foreground/30 focus-visible:ring-foreground/10";

const textareaClassName =
  "min-h-[180px] rounded-none border-foreground/12 bg-background/70 px-4 py-3 text-sm shadow-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-foreground/30 focus-visible:ring-foreground/10";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-destructive">
      *
    </span>
  );
}

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

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
            "Thanks. Your message has been sent and we will get back to you shortly.",
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
        "There was a problem sending your message. Please try again or email us directly.";

      setSubmissionState({ status: "error", message: errorMessage });
    } catch {
      setSubmissionState({
        status: "error",
        message:
          "There was a network problem sending your message. Please try again or email us directly.",
      });
    }
  });

  const isConfigured = Boolean(formspreeEndpoint);
  const isSubmitting = form.formState.isSubmitting;

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={cn(
            "relative border border-foreground transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 grid gap-12 px-8 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-16 lg:py-24">
            <div className="flex flex-col items-start">
              <span className="inline-flex items-center gap-3 text-sm font-display text-muted-foreground mb-6">
                <span className="w-8 h-px bg-foreground/30" />
                Contact
              </span>

              <h1 className="text-4xl lg:text-7xl font-display tracking-tight mb-8 leading-[0.95]">
                <span className="text-gradient-heading font-bold">Let&apos;s fix the design problem.</span>
                <br />
                <span className="text-muted-foreground font-normal">Together.</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mb-12">
                Tell us about your project, team, or current design coordination
                challenge and we will point you in the right direction.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                <a
                  href="https://calendly.com/ingeniumsoftware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient inline-flex items-center justify-center gap-2 px-8 h-14 text-base font-semibold rounded-full group"
                >
                  Book a Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="mailto:hello@ingeniumsoftware.ai"
                  className="inline-flex items-center justify-center px-8 h-14 text-base font-medium rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
                >
                  hello@ingeniumsoftware.ai
                </a>
              </div>

              <p className="text-sm text-muted-foreground font-display max-w-md">
                If you would rather send the details directly, use the form and
                we will follow up as soon as possible.
              </p>
            </div>

            <div className="border-t border-foreground/10 pt-10 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
              <div className="mb-8">
                <span className="inline-flex items-center gap-3 text-sm font-display text-muted-foreground mb-4">
                  <span className="w-8 h-px bg-foreground/30" />
                  Send an enquiry
                </span>
                <h2 className="text-3xl lg:text-4xl font-display tracking-tight leading-[1.05]">
                  <span className="font-bold">Share the essentials.</span>
                  <br />
                  <span className="text-muted-foreground font-normal">We will take it from there.</span>
                </h2>
              </div>

              {!isConfigured && (
                <Alert
                  variant="destructive"
                  className="mb-6 border-destructive/20 bg-destructive/5"
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
                <Alert className="mb-6 border-foreground/10 bg-foreground/[0.02]">
                  <CheckCircle2 className="mt-0.5 text-foreground" />
                  <AlertTitle>Message sent</AlertTitle>
                  <AlertDescription>{submissionState.message}</AlertDescription>
                </Alert>
              )}

              {submissionState.status === "error" && (
                <Alert
                  variant="destructive"
                  className="mb-6 border-destructive/20 bg-destructive/5"
                >
                  <AlertCircle className="mt-0.5" />
                  <AlertTitle>Unable to send message</AlertTitle>
                  <AlertDescription>{submissionState.message}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form
                  action={isConfigured ? formspreeEndpoint : undefined}
                  method="POST"
                  noValidate
                  onSubmit={onSubmit}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="gap-3">
                          <FormLabel className="text-sm font-display text-foreground/85">
                            Full Name <RequiredMark />
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="name"
                              className={inputClassName}
                              disabled={isSubmitting}
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
                          <FormLabel className="text-sm font-display text-foreground/85">
                            Email Address <RequiredMark />
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="email"
                              className={inputClassName}
                              disabled={isSubmitting}
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
                        <FormItem className="gap-3">
                          <FormLabel className="text-sm font-display text-foreground/85">
                            Company / Organisation
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="organization"
                              className={inputClassName}
                              disabled={isSubmitting}
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="gap-3">
                          <FormLabel className="text-sm font-display text-foreground/85">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="tel"
                              className={inputClassName}
                              disabled={isSubmitting}
                              type="tel"
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="gap-3">
                        <FormLabel className="text-sm font-display text-foreground/85">
                          Subject <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={inputClassName}
                            disabled={isSubmitting}
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
                    name="message"
                    render={({ field }) => (
                      <FormItem className="gap-3">
                        <FormLabel className="text-sm font-display text-foreground/85">
                          Message <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className={textareaClassName}
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="submit"
                      className="btn-gradient h-14 rounded-full px-8 text-base font-semibold shadow-none hover:shadow-none"
                      disabled={isSubmitting || !isConfigured}
                    >
                      {submissionState.status === "submitting" ? (
                        <>
                          <Spinner className="size-4" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-muted-foreground max-w-sm">
                      We only use the details you share here to respond to your
                      enquiry.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
