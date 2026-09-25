import { useState, useEffect } from "react";

export interface Region {
  id: string;
  name: string;
}

const BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/api";

export function useIndonesiaRegions() {
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [cities, setCities] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<Region[]>([]);

  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/provinces.json`)
      .then((res) => res.json())
      .then(setProvinces)
      .catch(() => console.error("Gagal memuat daftar provinsi"));
  }, []);

  useEffect(() => {
    if (!provinceId) {
      setCities([]);
      return;
    }
    fetch(`${BASE_URL}/regencies/${provinceId}.json`)
      .then((res) => res.json())
      .then(setCities)
      .catch(() => console.error("Gagal memuat daftar kota"));
  }, [provinceId]);

  useEffect(() => {
    if (!cityId) {
      setDistricts([]);
      return;
    }
    fetch(`${BASE_URL}/districts/${cityId}.json`)
      .then((res) => res.json())
      .then(setDistricts)
      .catch(() => console.error("Gagal memuat daftar kecamatan"));
  }, [cityId]);

  const resolveProvinceId = (name: string) =>
    provinces.find((p) => p.name.toUpperCase() === name.toUpperCase())?.id;

  const resolveCityId = (name: string) =>
    cities.find((c) => c.name.toUpperCase() === name.toUpperCase())?.id;

  return {
    provinces,
    cities,
    districts,
    provinceId,
    setProvinceId,
    cityId,
    setCityId,
    resolveProvinceId,
    resolveCityId,
  };
}