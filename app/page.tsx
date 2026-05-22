"use client";

import { useState } from "react";

export default function Home() {
    const [number, setNumber] = useState<number | null>(null);

    async function testApi() {
        const res = await fetch("http://localhost:3001/random");
        const data = await res.json();

        setNumber(data.number);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <button
                onClick={testApi}
                className="px-4 py-2 bg-black text-white rounded"
            >
                Get random number
            </button>

            <div className="text-3xl font-bold">
                {number !== null ? number : "No data"}
            </div>
        </div>
    );
}