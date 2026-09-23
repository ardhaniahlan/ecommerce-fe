"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, Loader2, StoreIcon } from "lucide-react";
import InputField from "@/components/form/InputField";
import { registerUser } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await registerUser(formData);
      router.push("/auth/login"); 
    } catch (error) {
      console.error("Register failed:", error);
      setErrorMsg("Pendaftaran gagal. Email mungkin sudah terdaftar atau server eror.");
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
            <span className="font-bold text-2xl text-white tracking-tight">Tech-Commerce</span>
          </Link>
          <h1 className="text-4xl font-bold text-white leading-tight mb-6">
            Mulai Perjalanan Tech Anda Bersama Kami.
          </h1>
          <p className="text-slate-400 text-lg">
            Dapatkan akses penuh ke katalog gawai premium, pelacakan pesanan, dan diskon member eksklusif.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun Baru</h2>
            <p className="text-gray-500">Lengkapi data di bawah untuk mendaftar.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Nama Lengkap"
              type="text"
              name="fullName"
              placeholder="Masukkan nama lengkap Anda"
              icon={User}
              value={formData.fullName}
              onChange={handleChange}
              required
            />

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
              placeholder="Minimal 6 karakter"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Daftar
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700 transition">
              Masuk Sekarang
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
