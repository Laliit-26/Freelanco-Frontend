import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const OrderCard = ({ order, onRoute }) => {
  const router = useRouter();
  function reduceWalletAddress(address) {
    const firstChars = address.slice(0, 6);
    const lastChars = address.slice(-4);
    return `${firstChars}...${lastChars}`;
  }

  console.log("ORDER:", order);

  return (
    <div
      className="w-full border p-4 bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 backdrop-blur-lg overflow-hidden transition-all duration-500 rounded-lg shadow-md cursor-pointer"
      style={{
        maxWidth: "250px",
      }}
      //   onMouseOver={() => setIsHover(true)}
      //   onMouseOut={() => setIsHover(false)}
    >
      <img
        className="rounded-t-lg cursor-pointer gig-image "
        src="https://i5.walmartimages.com/asr/f2a9913d-71b9-442b-9a76-c751a629eb0a_1.6bac684d3e345043dea3dad0e93c648e.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff"
        alt="product image"
        width={500}
        height={500}
        onClick={() => (onRoute != null ? onRoute(order?.gig_token_id) : null)}
      />

      <div className="flex justify-start items-center -mt-20">
        {/* <Image
          className="rounded-3xl m-4 max-h-sm"
          src={"https://ipfs.io/ipfs/" + order?.freelancer?.ipfsImageHash}
          alt="product image"
          width={50}
          height={50}
        /> */}
        <div className="flex-col"></div>
      </div>
      <div className="px-5 pb-5 pl-1">
        <h5
          className={
            "text-sm my-4 font-normal tracking-tight text-white "
            // colorChangeClass
          }
          // onClick={() => {
          //   router.push({
          //     pathname: "/order-detail",
          //     query: { order: JSON.stringify(order) },
          //   });
          // }}
        >
          {reduceWalletAddress(order?.client_address)}
          {/* {order?.client_address.slice(0, 24)}... */}
        </h5>

        <div className="flex items-center justify-between">
          {/* <div className="flex space-x-1">
            <div className="bg-white border-2 rounded-full flex items-center space-x-2 px-4 cursor-pointer h-12 justify-center hover:bg-gray-200">
              <img
                src="https://img.icons8.com/material-outlined/344/facebook-like--v1.png"
                alt=""
                className="h-4 w-4" //https://img.icons8.com/material-rounded/344/dislike.png
              />
            </div>
            <div className="bg-white border-2 rounded-full flex items-center space-x-2 px-4 cursor-pointer h-12 justify-center hover:bg-gray-200">
              <img
                src="https://img.icons8.com/material-rounded/344/dislike.png"
                alt=""
                className="h-4 w-4" //https://img.icons8.com/material-rounded/344/dislike.png
              />
            </div>
          </div> */}
          <span className="text-xl font-bold text-white ">
            {order.total_charges.toFixed(2)} MATIC
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
