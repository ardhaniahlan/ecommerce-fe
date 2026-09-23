"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, Loader2, StoreIcon } from "lucide-react";
import InputField from "@/components/form/InputField";
import { loginUser } from "@/services/auth.service";
import Cookies from "js-cookie";
import { getUserProfile } from "@/services/user.service";
import { useAuthStore } from "@/store/useAuthStore";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
        const res = await loginUser(formData);
        const token = res.data?.token;

        if (token) {
            const cookieOptions = {
                secure: process.env.NODE_ENV === "production", 
                sameSite: "strict" as const, 
                path: "/",
                expires: 7 
            };

            Cookies.set("token", token, cookieOptions);
            
            const profileRes = await getUserProfile();
            const userData = profileRes.data; 

            if (userData) {
                Cookies.set("user_session", JSON.stringify(userData), cookieOptions);
                login(userData);
                
                router.push(returnUrl);
            } else {
                setErrorMsg("Gagal mendapatkan data profil dari server.");
            }

        } else {
            setErrorMsg("Email atau kata sandi salah.");
        }
    } catch (error: any) {
        setErrorMsg(error.message);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="min-h-screen flex w-full bg-white">
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative flex-col justify-center items-center p-12 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <StoreIcon className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">
              Tech-Commerce
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-white leading-tight mb-6">
            Temukan Gadget Impianmu Hari Ini.
          </h1>
          <p className="text-slate-400 text-lg">
            Bergabunglah dengan ribuan tech-enthusiast lainnya dan nikmati
            penawaran eksklusif setiap hari.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang
            </h2>
            <p className="text-gray-500">Silakan masukkan detail akun Anda.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <InputField
              label="Alamat Email"
              type="email"
              name="email"
              placeholder="contoh@email.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <InputField
              label="Kata Sandi"
              type="password"
              name="password"
              placeholder="Masukkan kata sandi"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Masuk
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Belum punya akun?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
