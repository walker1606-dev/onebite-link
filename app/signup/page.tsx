"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Toast from "@/components/toast";
import { createClient } from "@/utils/supabase/client";

function toKoreanErrorMessage(message: string): string {
  if (message.includes("already registered") || message.includes("already exists")) {
    return "이미 가입된 이메일입니다.";
  }
  if (message.includes("Password should be at least")) {
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  if (message.includes("Unable to validate email") || message.includes("invalid")) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "회원가입에 실패했습니다. 다시 시도해주세요.";
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormFilled =
    email.trim().length > 0 &&
    password.length > 0 &&
    passwordConfirm.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setErrorMessage(toKoreanErrorMessage(error.message));
        return;
      }
      router.push("/");
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

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[var(--text)]"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password-confirm"
            className="text-sm font-medium text-[var(--text)]"
          >
            비밀번호 확인
          </label>
          <input
            id="password-confirm"
            type="password"
            required
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormFilled || isSubmitting}
          className="button-primary-hover rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>

        <p className="text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-medium text-[var(--accent)]">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
