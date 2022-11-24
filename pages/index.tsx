import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [priceE10, setPriceE10] = useState(0);
  const [price95, setPrice95] = useState(0);

  const fetchFuelCheckApp = async () => {
    const res = await fetch("https://api.onegov.nsw.gov.au/FuelCheckApp/v1/fuel/prices/currenttrend");
    const prices = await res.json();
    // console.log(prices);
    prices.forEach((price) => {
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
          <h2 className="w-full font-semibold rounded-md bg-purple-200 text-center py-1">Fuel Check</h2>
          <div className="flex w-full items-center justify-center space-x-4">
            <div className="text-center text-xl text-gray-500 rounded-xl py-3 bg-gray-100 w-1/3">
              P91: <span className="text-black">${priceE10}</span>
            </div>
            <div className="text-center text-xl text-gray-500 rounded-xl py-3 bg-gray-100 w-1/3">
              P95: <span className="text-black">${price95}</span>
            </div>
          </div>
        </article>

        <article className="flex flex-col w-full items-center justify-center space-y-3">
          <h2 className="w-full font-semibold rounded-md bg-purple-200 text-center py-1">petrolspy.com</h2>
          <img className="w-5/6" src="https://petrolspy.com.au/graph/sydney_U91E10.svg" />
        </article>

        <article className="flex flex-col w-full items-center justify-center space-y-3">
          <h2 className="w-full font-semibold rounded-md bg-purple-200 text-center py-1">accc.gov.au</h2>
          <img
            className="w-5/6"
            src="https://www.accc.gov.au/sites/www.accc.gov.au/files/fuelwatch/sydney-ulp.png"
          />
        </article>
      </main>
    </div>
  );
}
