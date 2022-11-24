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
  const [price95, setPrice95] = useState(0);

  const fetchFuelCheckApp = async () => {
    const res = await fetch("https://api.onegov.nsw.gov.au/FuelCheckApp/v1/fuel/prices/currenttrend");
    const prices = await res.json();
    // console.log(prices);
    prices.forEach((price: Price) => {
      if (price.FuelGroupCode === "E10") {
        setPriceE10(price.Price);
      } else if (price.FuelGroupCode === "P95") {
        setPrice95(price.Price);
      }
    });
  };
  useEffect(() => {
    fetchFuelCheckApp();
  }, []);

  return (
    <div className="">
      <Head>
        <title>petrol</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center space-y-3">
        <article className="flex flex-col w-full items-center justify-center space-y-3">
          <h2 className="w-full font-semibold rounded-md bg-gray-200 text-center py-1">Fuel Check</h2>
          <div className="flex w-full items-center justify-center space-x-4">
            <div className="text-center text-xl rounded-xl py-3 border-2 border-black w-1/3 bg-green-100">
              <div className="text-gray-600 ">E10</div>
              <div className="font-semibold">${priceE10}</div>
            </div>
            <div className="text-center text-xl rounded-xl py-3 border-2 border-black w-1/3 bg-yellow-100">
              <div className="text-gray-600 ">P95</div>
              <div className="font-semibold">${price95}</div>
            </div>
          </div>
        </article>

        <article className="flex flex-col w-full items-center justify-center space-y-3">
          <h2 className="w-full font-semibold rounded-md bg-gray-200 text-center py-1">Petrol Spy</h2>
          <img className="" src="https://petrolspy.com.au/graph/sydney_U91E10.svg" />
        </article>

        <article className="flex flex-col w-full items-center justify-center space-y-3">
          <h2 className="w-full font-semibold rounded-md bg-gray-200 text-center py-1">ACCC</h2>
          <img
            className=""
            src="https://www.accc.gov.au/sites/www.accc.gov.au/files/fuelwatch/sydney-ulp.png"
          />
        </article>
      </main>

      <div className="flex justify-center text-center py-10">
        <a
          className="hover:underline"
          href="https://github.com/minho42/petrol"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
