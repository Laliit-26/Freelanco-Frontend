import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getProposalsOfClient } from "../api/auth";
import GigActions from "../components/Gigs/GigActions";
import GigDetails from "../components/Gigs/GigDetails";
import GigManagement from "../components/Gigs/GigManagement";
import useAuth from "../hooks/useAuth";
import { getGigById } from "../api/gig";

const GigDetail = () => {
  const router = useRouter();
  let gigId;
  if (router.query.gig) {
    gigId = JSON.parse(router.query.gig);
  }
  const [gig, setGig] = useState({});
  useEffect(() => {
    async function fetchGig() {
      if (gigId) {
        console.log("GOGID ", gigId);
        const gigData = await getGigById(gigId);
        setGig(gigData);
      }
    }
    fetchGig();
  }, [gigId]);
  const { user } = useAuth();

  const isMyGig = user?._id == gig?.user_ref;

  return (
    <div
      className="min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
      style={
        user?._id == gig?.user_ref
          ? {
              // backgroundImage: `url('/ff.jpeg')`,
              // backgroundSize: "cover",
              // filter: "blur(8px)",
            }
          : {
              // backgroundColor: "black",
              // // color: "white",
              // backgroundImage: `url('/ff.jpeg')`,
              // backgroundSize: "cover",
            }
      }
    >
      {gig && user?._id == gig?.user_ref ? (
        <GigManagement gig={gig} />
      ) : (
        <div className="flex px-20 pt-20">
          <div className="flex-3/4 w-3/4">
            <GigDetails gig={gig} />
          </div>
          <div className="flex-1/4 w-1/4 phoneItOut">
            <GigActions gig={gig} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GigDetail;
