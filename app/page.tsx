"use client";

import { useState } from "react";
import { translations, type Lang } from "./translations";

export default function Home() {
  const [number, setNumber] = useState<number | null>(null);
  const [lang, setLang] = useState<Lang>("en");

  const t = translations[lang];

  async function testApi() {
    const res = await fetch("http://localhost:3001/random");
    const data = await res.json();
    setNumber(data.number);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex gap-2">
        {(Object.keys(translations) as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded border text-sm ${
              lang === l ? "bg-black text-yellow" : "bg-white text-black"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        onClick={testApi}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {t.button}
      </button>

      <div className="text-3xl font-bold">
        {number !== null ? number : t.noData}
      </div>
    </div>
  );
}
