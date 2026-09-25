"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { User, MapPin, Phone, Save } from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/services/user.service";
import InputField from "@/components/form/InputField";
import { useIndonesiaRegions } from "@/hooks/useRegion";
import ProfileLoad from "@/components/loading/ProfileLoad";
import SelectField from "@/components/form/SelectField";
import BaseModal from "@/components/modal/BaseModal";
import ModalFooterActions from "@/components/modal/ModalFooterActions";

export default function ProfilePage() {
  const { user: authUser, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    provinces,
    cities,
    districts,
    provinceId,
    setProvinceId,
    cityId,
    setCityId,
    resolveProvinceId,
    resolveCityId,
  } = useIndonesiaRegions();

  const [formData, setFormData] = useState({
    email: authUser?.email || "",
    full_name: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    postal_code: "",
    street_address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        const data = res.data;
        setFormData({
          email: data.email || "",
          full_name: data.fullName || "",
          phone: data.phone || "",
          province: data.province || "",
          city: data.city || "",
          district: data.district || "",
          postal_code: data.postalCode || "",
          street_address: data.streetAddress || "",
        });
      } catch (error) {
        console.error("Gagal mengambil profil", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!provinceId && formData.province) {
      const id = resolveProvinceId(formData.province);
      if (id) setProvinceId(id);
    }
  }, [formData.province, provinceId, resolveProvinceId, setProvinceId]);

  useEffect(() => {
    if (!cityId && formData.city) {
      const id = resolveCityId(formData.city);
      if (id) setCityId(id);
    }
  }, [formData.city, cityId, resolveCityId, setCityId]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setProvinceId(id);
    setCityId("");
    setFormData((prev) => ({
      ...prev,
      province: name,
      city: "",
      district: "",
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setCityId(id);
    setFormData((prev) => ({ ...prev, city: name, district: "" }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.options[e.target.selectedIndex].text;
    setFormData((prev) => ({ ...prev, district: name }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await updateUserProfile(formData);

      if (authUser) {
        login({ ...authUser, ...formData });
      }

      setShowSuccessModal(true);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error || "Gagal memperbarui profil",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <ProfileLoad />;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <BaseModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Pembaruan Berhasil"
        description="Profil dan alamat pengiriman Anda telah berhasil diperbarui. Anda sekarang dapat melanjutkan proses checkout."
        footer={
          <ModalFooterActions
            cancelText=""
            confirmText="Selesai"
            onConfirm={() => setShowSuccessModal(false)}
            onCancel={() => {}}
          />
        }
      />

      <BaseModal
        isOpen={errorMessage !== ""}
        onClose={() => setErrorMessage("")}
        title="Terjadi Kesalahan"
        description={errorMessage}
        footer={
          <ModalFooterActions
            cancelText=""
            confirmText="Tutup"
            onConfirm={() => setErrorMessage("")}
            onCancel={() => {}}
          />
        }
      />

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 p-6 bg-gray-50 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">
            Profil & Alamat Pengiriman
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">
              Informasi Kontak
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email"
                name="email"
                icon={User}
                value={formData.email}
                onChange={handleChange}
                placeholder="Contoh: johndue@example.com"
                disabled
              />
              <InputField
                label="Nama Lengkap"
                name="full_name"
                icon={User}
                required
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Contoh: John Doe"
              />
              <InputField
                label="Nomor Handphone"
                name="phone"
                icon={Phone}
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: 08123456789"
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">
              Alamat Pengiriman
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Provinsi"
                name="province"
                value={provinceId}
                onChange={handleProvinceChange}
                options={provinces.map((p) => ({ value: p.id, label: p.name }))}
                placeholder="-- Pilih Provinsi --"
                required
              />

              <SelectField
                label="Kota / Kabupaten"
                name="city"
                value={cityId}
                onChange={handleCityChange}
                options={cities.map((c) => ({ value: c.id, label: c.name }))}
                placeholder="-- Pilih Kota/Kabupaten --"
                disabled={!provinceId}
                required
              />

              <SelectField
                label="Kecamatan"
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                options={districts.map((d) => ({
                  value: d.name,
                  label: d.name,
                }))}
                placeholder="-- Pilih Kecamatan --"
                disabled={!cityId}
                required
              />

              <InputField
                label="Kode Pos"
                name="postal_code"
                type="number"
                required
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="17530"
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-4 mt-4">
              <label className="text-sm font-semibold text-gray-700">
                Detail Alamat (Jalan, Blok, RT/RW, Patokan)
              </label>
              <textarea
                name="street_address"
                required
                rows={3}
                value={formData.street_address}
                onChange={handleChange}
                placeholder="Jl. Contoh Raya No. 123, Blok A, dekat masjid..."
                className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-2.5 px-4 outline-none transition-all text-sm text-black resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition disabled:bg-gray-400"
            >
              <Save className="w-5 h-5" />
              {isLoading ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
