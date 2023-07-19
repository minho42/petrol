import Head from "next/head";
import { useEffect, useState } from "react";

interface Price {
  readonly Code: string;
  readonly Price: number;
  readonly Variance: number;
  readonly FuelGroupCode: string;
}

export default function Home() {
  const [priceE10, setPriceE10] = useState(0);

  const fetchFuelCheckApp = async () => {
    const res = await fetch("https://api.onegov.nsw.gov.au/FuelCheckApp/v1/fuel/prices/currenttrend");
    const prices = await res.json();
    // console.log(prices);
    prices.forEach((price: Price) => {
      if (price.FuelGroupCode === "E10") {
        setPriceE10(price.Price);
      }
    });
  };
  useEffect(() => {
    fetchFuelCheckApp();
  }, []);

  return (
    <div className="">
      <Head>
        <title>⛽️ Petrol</title>
        <meta name="description" content="Check petrol prices in Sydney, NSW" />
      </Head>

      <main className="flex flex-col items-center justify-center space-y-6">
        <article className="flex flex-col w-full items-center justify-center ">
          <h2 className="w-full font-semibold text-center py-1">Fuel Check</h2>
          <section className="flex w-full items-center justify-between text-white">
            <div className="text-center text-xl py-2 w-full bg-blue-500">
              <div className="text-xl">E10</div>
              <div className="text-3xl font-semibold">${priceE10}</div>
            </div>
          </section>
        </article>

        <article className="flex flex-col w-full items-center justify-center">
          <h2 className="w-full font-semibold text-center py-1">Petrol Spy</h2>
          <img className="" src="https://petrolspy.com.au/graph/sydney_U91E10.svg" />
        </article>
      </main>
    </div>
  );
}
