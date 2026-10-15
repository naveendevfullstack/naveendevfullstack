import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.title}
        </p>
        <p>Built with React, TypeScript & Tailwind CSS.</p>
      </div>
    </footer>
  )
}
