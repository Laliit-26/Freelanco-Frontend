import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CategoryCard } from "../components/Explore/Deck";
import GigCard from "../components/Gigs/GigCard";
import GigsWelcome from "../components/Gigs/GigsWelcome";
import useAuth from ".././hooks/useAuth";
import Deck from "../components/Explore/Deck";
import { getProposalsOfClient } from "../api/auth";
import { getAllGig, getPopular, getGigBySearch } from "../api/gig";
import { watchAccount } from "@wagmi/core";
import ErrorBox from "../components/Validation/ErrorBox";
import { useRouter } from "next/router";

const GigsListing = () => {
  const [mostPopular, setMostPopular] = useState([]);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showTxDialog, setShowTxDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [txMessage, setTxMessage] = useState(undefined);

  const [isLoading, setIsLoading] = useState(true);

  const { user, search, searchedGigs, setIsLoggedIn, setUser } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const res = await getPopular();
      setMostPopular(
        res.filter((r) => {
          if (user) {
            return r.freelancer.wallet_address !== user.wallet_address;
          } else {
            return r;
          }
        })
      );
      setIsLoading(false);
    };
    getData();
  }, [user]);

  const router = useRouter();

  const unwatch = watchAccount((account) => {
    if (user) {
      if (account.address != user.wallet_address) {
        setIsLoggedIn(false);
        console.log("LOGGED OUT");
        setShowErrorDialog(true);
        setErrorMessage("You logged out");
        localStorage.removeItem("token");

        // router.push("/login");
        setUser(null);
      }
    }
  });

  return (
    <div
      className="flex-col pt-20 transition ease-in-out delay-80 w-full bg-cover"
      style={{
        backgroundImage: `url('/ff.jpeg')`,

        // filter: "blur(8px)",
      }}
    >
      <ErrorBox
        show={showErrorDialog}
        cancel={setShowErrorDialog}
        errorMessage={errorMessage}
      />
      <div className="flex gap-x-5 mb-12">
        {searchedGigs.length == 0 ? (
          <div className="mt-10 w-full mr-5 flex flex-col">
            <p className="text-white font-bold text-5xl pl-20 my-2">
              Marketplace
            </p>
            <p className="text-gray-500 font-light text-xl pl-20 my-2 mb-5">
              Explore the world of decentralized trust
            </p>
            <Deck />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="transition ease-in-out delay-80 ">
        <div className="mt-10 w-full mr-5 flex flex-col">
          <p className="text-white font-bold text-5xl pl-20 my-2">Trending</p>
        </div>
        <div className="flex  flex-wrap gap-x-8 gap-y-6 mt-5 pb-20 px-20">
          {isLoading ? (
            // Display the loading component while data is being fetched
            <img src="loading.gif" height={50} width={50} />
          ) : typeof searchedGigs == "object" && searchedGigs.length == 0 ? (
            mostPopular.length > 0 ? (
              mostPopular.map((gig) => (
                <>
                  <GigCard key={gig._id} gig={gig} />{" "}
                </>
              ))
            ) : (
              // Display the empty state if no gigs are found
              <div className="min-h-[calc(70vh)] flex items-center justify-center flex-col absoluteCenter">
                <img
                  src={"/empty.png"}
                  alt=""
                  className="w-1/4 h-1/4"
                  style={{
                    filter: "grayscale(1)",
                  }}
                />
                <p className="text-center text-gray-800 font-bold">
                  No gigs found
                </p>
              </div>
            )
          ) : typeof searchedGigs != "string" ? (
            <>
              {searchedGigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
            </>
          ) : (
            <div className="min-h-[calc(70vh)] flex items-center justify-center flex-col absoluteCenter">
              <img
                src={"/empty.png"}
                alt=""
                className="w-1/4 h-1/4"
                style={{
                  filter: "grayscale(1)",
                }}
              />
              <p className="text-center text-gray-800 font-bold">
                No gigs found
              </p>
            </div>
          )}
        </div>
        {/* <p className="text-2xl font-semibold mt-10">Gigs you may like</p>
        <div className="flex flex-wrap gap-x-8 gap-y-6 mt-5">
          {recommendedGigs.length > 0 ? (
            recommendedGigs.map((gig) => <GigCard gig={gig} />)
          ) : (
            <>No Gigs</>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default GigsListing;
