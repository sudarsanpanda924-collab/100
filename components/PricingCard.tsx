"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
  color: string;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Essential tools for casual creators and students.",
    features: [
      "5 Free AI generations per day",
      "Unlimited access to 50+ Non-AI tools",
      "No credit card required",
      "Standard generation speed",
      "Ad-supported interface"
    ],
    buttonText: "Use Instantly",
    isPopular: false,
    color: "slate",
  },
  {
    name: "Pro",
    price: "₹299",
    period: "month",
    description: "Perfect for active freelancers and power creators.",
    features: [
      "250 AI generations per day",
      "Unlimited access to all 130+ tools",
      "Ad-free interface",
      "High-speed generation priority",
      "Early access to new releases",
      "Premium support response"
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
    color: "primary",
  },
  {
    name: "Agency",
    price: "₹999",
    period: "month",
    description: "Designed for content agencies and startups.",
    features: [
      "Unlimited AI generations",
      "Everything in Pro plan included",
      "5 Team member accounts",
      "API programmatic access keys",
      "Custom branding export layouts",
      "24/7 Dedicated account support"
    ],
    buttonText: "Upgrade to Agency",
    isPopular: false,
    color: "accent",
  }
];

export default function PricingCard() {
  return (
    <div id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          Start for free without signing up. Upgrade anytime to unlock higher AI generation limits and programmatic features.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`relative flex flex-col justify-between rounded-3xl border p-8 shadow-premium ${
              plan.isPopular
                ? "border-primary-500 bg-white ring-1 ring-primary-100 scale-[1.03]"
                : "border-slate-100 bg-white"
            }`}
          >
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-1 text-xs font-semibold text-white shadow-md">
                <Sparkles className="h-3 w-3" /> Most Popular
              </span>
            )}

            <div>
              <h3 className="font-heading text-xl font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
              <div className="mt-6 flex items-baseline">
                <span className="font-heading text-4xl font-extrabold tracking-tight text-slate-900">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm font-semibold text-slate-400">/{plan.period}</span>
              </div>

              {/* Features checklist */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      plan.isPopular ? "bg-primary-50 text-primary-600" : "bg-slate-50 text-slate-600"
                    }`}>
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-slate-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                className={`w-full rounded-2xl py-3 text-center text-sm font-bold shadow-sm transition-all duration-200 ${
                  plan.isPopular
                    ? "bg-primary-600 text-white hover:bg-primary-500 hover:shadow-md"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
