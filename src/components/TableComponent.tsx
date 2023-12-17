'use client'
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { CryptoContext } from "@/context/CryptoContext";
import Link from "next/link";

interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: {
        times: number;
        currency: string;
        percentage: number;
    } | null;
    last_updated: string;
    price_change_percentage_24h_in_currency: number;
}

const TableComponent: React.FC = () => {
    const router = useRouter();
    const { cryptoData } = useContext<CryptoData[]>(CryptoContext);

    return (
        <div className="flex flex-col mt-9 border border-gray-100 rounded">
            {cryptoData ? (
                <table className="w-full table-auto">
                    <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
                        <tr>
                            <th className="py-1">asset</th>
                            <th className="py-1">name</th>
                            <th className="py-1">price</th>
                            <th className="py-1">total volume</th>
                            <th className="py-1">market cap change</th>
                            <th className="py-1 lg:table-cell hidden">1H</th>
                            <th className="py-1 lg:table-cell hidden">24H</th>
                            <th className="py-1 lg:table-cell hidden">7D</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoData.map((data) => (
                            <tr
                                key={data.id}
                                className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                            >
                                <td className="py-4 flex items-center uppercase">
                                    <img
                                        className="w-[1.2rem] h-[1.2rem] mx-1.5"
                                        src={data.image}
                                        alt={data.name}
                                    />
                                    <Link href={`crypto/${data.id}`} passHref={true} legacyBehavior={true}>
                                        <a className="cursor-pointer">{data.symbol}</a>
                                    </Link>

                                </td>
                                <td className="py-4">
                                    <Link href={`crypto/${data.id}`} passHref={true} legacyBehavior={true}>
                                        <a className="cursor-pointer">{data.name}</a>
                                    </Link>

                                </td>
                                <td className="py-4">
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR", // Adjust currency as needed
                                    }).format(data.current_price)}
                                </td>
                                <td className="py-4">{data.total_volume}</td>
                                <td className="py-4">{data.market_cap_change_percentage_24h}%</td>
                                <td
                                    className={
                                        data.price_change_percentage_1h_in_currency > 0
                                            ? "text-green py-4 lg:table-cell hidden"
                                            : "text-red py-4  lg:table-cell hidden"
                                    }
                                >
                                    {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
                                </td>
                                <td
                                    className={
                                        data.price_change_percentage_24h_in_currency > 0
                                            ? "text-green py-4 lg:table-cell hidden"
                                            : "text-red py-4  lg:table-cell hidden"
                                    }
                                >
                                    {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
                                </td>
                                <td
                                    className={
                                        data.price_change_percentage_7d_in_currency > 0
                                            ? "text-green py-4 lg:table-cell hidden"
                                            : "text-red py-4  lg:table-cell hidden"
                                    }
                                >
                                    {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

export default TableComponent;
