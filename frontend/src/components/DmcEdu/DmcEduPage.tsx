"use client";

import {
  Award,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Layers3,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type AcademyKey = "career" | "professional" | "real";
type ProgressState = "Not Started" | "In Progress" | "Completed" | "Badge Earned";

type Category = {
  title: string;
  description: string;
  estimatedModules: number;
  level: string;
  credential: string;
  progress: ProgressState;
};

type Academy = {
  key: AcademyKey;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof BriefcaseBusiness;
  categories: Category[];
};

const categoryDescriptions: Record<AcademyKey, string> = {
  career: "Explore roles, industries, skills, and next steps before choosing a career direction.",
  professional: "Build the habits, documents, communication, and confidence needed for the workplace.",
  real: "Grow through practical conversations about life, identity, wellness, and brotherhood.",
};

const academyData: Academy[] = [
  {
    key: "career",
    title: "Career Academy",
    shortTitle: "Career",
    description: "Explore careers by industry, role, skill set, and pathway.",
    icon: BriefcaseBusiness,
    categories: [
      "Technology",
      "Business",
      "Engineering",
      "Healthcare",
      "Law & Government",
      "Creative & Media",
      "Science & Research",
      "Education",
      "Architecture & Construction",
      "Environment & Sustainability",
      "Aviation & Aerospace",
      "Public Safety",
      "Arts & Entertainment",
      "Sports & Recreation",
      "Entrepreneurship",
    ].map((title, index) => ({
      title,
      description: `${categoryDescriptions.career} Replace this with DMC-specific guidance later.`,
      estimatedModules: 4 + (index % 4),
      level: index % 3 === 0 ? "Beginner" : index % 3 === 1 ? "Intermediate" : "Exploration",
      credential: index % 2 === 0 ? "Badge preview" : "Certificate preview",
      progress: index === 0 ? "In Progress" : index === 1 ? "Badge Earned" : "Not Started",
    })),
  },
  {
    key: "professional",
    title: "Professional Academy",
    shortTitle: "Professional",
    description: "Become career-ready, workplace-ready, and confident in professional settings.",
    icon: GraduationCap,
    categories: [
      "Personal Brand",
      "Career Readiness",
      "Professional Communication",
      "Leadership & Teamwork",
      "Workplace Success",
      "Financial Wellness",
      "Networking & Personal Brand",
      "Productivity & Organization",
      "Graduate & Career Planning",
    ].map((title, index) => ({
      title,
      description: `${categoryDescriptions.professional} Add workshops, forms, and DMC resources here later.`,
      estimatedModules: 3 + (index % 5),
      level: index % 2 === 0 ? "Core" : "Applied",
      credential: index % 3 === 0 ? "Certificate preview" : "Badge preview",
      progress: index === 0 ? "Completed" : index === 2 ? "In Progress" : "Not Started",
    })),
  },
  {
    key: "real",
    title: "Let's Get Real",
    shortTitle: "Real Life",
    description: "Real-life growth, personal development, wellness, and brotherhood.",
    icon: HeartHandshake,
    categories: [
      "Mental Health & Wellness",
      "Relationships",
      "Personal Growth",
      "Life Skills",
      "Adulting",
      "Identity & Culture",
      "Brotherhood & Community",
      "Character & Values",
      "Life Challenges",
      "Purpose & Legacy",
    ].map((title, index) => ({
      title,
      description: `${categoryDescriptions.real} Use this space for honest lessons, prompts, and activities.`,
      estimatedModules: 2 + (index % 4),
      level: index % 2 === 0 ? "Reflective" : "Practical",
      credential: index % 2 === 0 ? "Badge preview" : "Growth certificate",
      progress: index === 1 ? "In Progress" : "Not Started",
    })),
  },
];

const learningPathSteps = [
  { title: "Overview", description: "What this path covers and why it matters.", icon: Compass },
  { title: "Module 1", description: "Foundational lesson with examples and reflection.", icon: BookOpen },
  { title: "Module 2", description: "Applied lesson connected to DMC member growth.", icon: Layers3 },
  { title: "Knowledge Check", description: "Short quiz or reflection checkpoint.", icon: CheckCircle2 },
  { title: "Mission / Hands-on Activity", description: "Complete a real action outside the lesson.", icon: PlayCircle },
  { title: "Certificate", description: "Earn proof of completion for the learning path.", icon: Award },
];

const studentPreview = {
  currentPaths: ["Career Academy: Technology", "Professional Academy: Career Readiness"],
  certificatesEarned: 1,
  badgesEarned: 3,
  progressPercentage: 42,
  recommendedNextModule: "Build your LinkedIn profile story",
};

const adminPreview = {
  totalMembersEnrolled: 128,
  completionRate: "37%",
  popularModules: ["Resume Foundations", "Technology Career Map", "Mental Health Check-In"],
  certificatesIssued: 24,
};

function ProgressBadge({ status }: { status: ProgressState }) {
  const styles: Record<ProgressState, string> = {
    "Not Started": "border-zinc-700 text-zinc-400",
    "In Progress": "border-yellow-400/50 text-yellow-300",
    Completed: "border-emerald-400/50 text-emerald-300",
    "Badge Earned": "border-white/20 bg-yellow-400 text-black",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

function EduHero() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-36 md:px-8 md:pt-44">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">
        Developing Men of Color
      </p>
      <h1 className="font-['PolySans'] mt-5 max-w-4xl text-6xl font-semibold leading-none text-white md:text-8xl">
        DMC Edu
      </h1>
      <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300 md:text-2xl">
        Learn. Grow. Build your future.
      </p>
      <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-500">
        A future learning hub for career exploration, professional development, and real-life growth.
        Placeholder content is data-driven so each section can be replaced later.
      </p>
    </section>
  );
}

function AcademyCard({
  academy,
  isActive,
  onSelect,
}: {
  academy: Academy;
  isActive: boolean;
  onSelect: (key: AcademyKey) => void;
}) {
  const Icon = academy.icon;

  return (
    <button
      className={`group border p-6 text-left transition ${
        isActive
          ? "border-yellow-400 bg-yellow-400 text-black"
          : "border-white/10 bg-zinc-950 text-white hover:border-yellow-400/70"
      }`}
      onClick={() => onSelect(academy.key)}
      type="button"
    >
      <div className="flex items-start justify-between gap-6">
        <Icon size={34} strokeWidth={1.7} />
        <span className="text-sm font-semibold">{academy.categories.length} sections</span>
      </div>
      <h2 className="font-['PolySans'] mt-8 text-3xl font-semibold">{academy.title}</h2>
      <p className={`mt-4 text-sm leading-6 ${isActive ? "text-black/75" : "text-zinc-400"}`}>
        {academy.description}
      </p>
      <span className="mt-8 inline-flex text-sm font-semibold">
        Explore Academy
      </span>
    </button>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="border-b border-white/10 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="font-['PolySans'] text-xl font-semibold text-white">{category.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">{category.description}</p>
        </div>
        <ProgressBadge status={category.progress} />
      </div>
      <div className="mt-5 grid gap-4 text-sm text-zinc-400 sm:grid-cols-3">
        <p>{category.estimatedModules} estimated modules</p>
        <p>{category.level}</p>
        <p>{category.credential}</p>
      </div>
    </article>
  );
}

function ModuleCard({ step, index }: { step: (typeof learningPathSteps)[number]; index: number }) {
  const Icon = step.icon;

  return (
    <article className="relative pl-12">
      <span className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-yellow-400 text-black">
        <Icon size={18} strokeWidth={1.8} />
      </span>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        Step {index + 1}
      </p>
      <h3 className="font-['PolySans'] mt-2 text-lg font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{step.description}</p>
    </article>
  );
}

function LearningPathCard({ academy }: { academy: Academy }) {
  return (
    <section className="border-y border-white/10 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Learning Path
          </p>
          <h2 className="font-['PolySans'] mt-3 text-3xl font-semibold text-white">
            Sample {academy.shortTitle} Path
          </h2>
        </div>
        <ProgressBadge status="In Progress" />
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {learningPathSteps.map((step, index) => (
          <ModuleCard key={step.title} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}

function StudentProgressPreview() {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">Student View</p>
      <h2 className="font-['PolySans'] mt-3 text-3xl font-semibold text-white">Progress Preview</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-['PolySans'] text-6xl font-semibold text-white">
            {studentPreview.progressPercentage}%
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-yellow-400"
              style={{ width: `${studentPreview.progressPercentage}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            Recommended next module: {studentPreview.recommendedNextModule}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <PreviewStat label="Current paths" value={studentPreview.currentPaths.length.toString()} />
          <PreviewStat label="Certificates earned" value={studentPreview.certificatesEarned.toString()} />
          <PreviewStat label="Badges earned" value={studentPreview.badgesEarned.toString()} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Learning paths</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {studentPreview.currentPaths.map((path) => (
                <li key={path}>{path}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminAnalyticsPreview() {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">Leader View</p>
      <h2 className="font-['PolySans'] mt-3 text-3xl font-semibold text-white">Admin Analytics Preview</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        <PreviewStat label="Members enrolled" value={adminPreview.totalMembersEnrolled.toString()} />
        <PreviewStat label="Completion rate" value={adminPreview.completionRate} />
        <PreviewStat label="Certificates issued" value={adminPreview.certificatesIssued.toString()} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Popular modules</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {adminPreview.popularModules.map((module) => (
              <li key={module}>{module}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="font-['PolySans'] mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default function DmcEduPage() {
  const [activeAcademyKey, setActiveAcademyKey] = useState<AcademyKey>("career");
  const activeAcademy = useMemo(
    () => academyData.find((academy) => academy.key === activeAcademyKey) || academyData[0],
    [activeAcademyKey],
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <EduHero />

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {academyData.map((academy) => (
            <AcademyCard
              key={academy.key}
              academy={academy}
              isActive={academy.key === activeAcademy.key}
              onSelect={setActiveAcademyKey}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Explore Academy
            </p>
            <h2 className="font-['PolySans'] mt-3 text-4xl font-semibold text-white">
              {activeAcademy.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-400">{activeAcademy.description}</p>
        </div>

        <div className="mt-4">
          {activeAcademy.categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <LearningPathCard academy={activeAcademy} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 md:px-8 xl:grid-cols-2">
        <StudentProgressPreview />
        <AdminAnalyticsPreview />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-8 md:px-8">
        <div className="grid gap-6 border-t border-white/10 pt-10 md:grid-cols-4">
          {[
            ["Learning Paths", BookOpen],
            ["Badges", ShieldCheck],
            ["Certificates", Trophy],
            ["Member Cohorts", Users],
          ].map(([label, Icon]) => {
            const DisplayIcon = Icon as typeof BookOpen;
            return (
              <div key={label as string} className="flex items-center gap-3 text-zinc-300">
                <DisplayIcon size={20} strokeWidth={1.8} className="text-yellow-400" />
                <span className="text-sm font-medium">{label as string}</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
