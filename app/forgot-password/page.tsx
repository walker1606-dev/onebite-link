"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Toast from "@/components/toast";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setErrorMessage("비밀번호 재설정 링크 발송에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex h-full flex-1 items-center justify-center bg-[var(--background)]">
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-6 px-6"
      >
        <span className="text-center text-xl font-semibold tracking-tight text-[var(--text)]">
          한입 링크
        </span>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[var(--text)]"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        {isSent ? (
          <p className="text-center text-sm text-[var(--success)]">
            비밀번호 재설정 링크를 이메일로 발송했습니다.
          </p>
        ) : (
          <button
            type="submit"
            disabled={email.trim().length === 0 || isSubmitting}
            className="button-primary-hover rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "발송 중..." : "비밀번호 리셋 링크 발송"}
          </button>
        )}

        <p className="text-center text-sm text-[var(--text-sub)]">
          <Link href="/login" className="font-medium text-[var(--accent)]">
            로그인으로 돌아가기
          </Link>
        </p>
      </form>
    </div>
  );
}
