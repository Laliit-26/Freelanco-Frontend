import NavDrawer from "../components/chat/NavDrawer";
import Chat from "../components/chat/Chat";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { socket, connectSocket } from "../socket";
import useAuth from "../hooks/useAuth";

const Conversation = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [freelancerAddr, setFreelancerAddr] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [gigId, setGigId] = useState(undefined);

  useEffect(() => {
    if (router.query) {
      const freelancer_address = router.query.address;

      const id = router.query.gig_id;

      setFreelancerAddr(freelancer_address);
      setGigId(id);
    }
  }, [router]);

  const [selected, setSelected] = useState(null);
  const [conversationsData, setConversationsData] = useState(null);

  useEffect(() => {
    if (user && socket) {
      socket.emit(
        "get_direct_conversations",
        { user_id: user?.wallet_address },
        (data) => {
          setConversationsData(data);
          if (data.length > 0) {
            setSelected(data[0]._id);
          }
          // setMessagesList(data);
        }
      );
    }
  }, [user, socket]);

  const getConversations = () => {
    // if (!socket && user) {
    //   connectSocket(user.wallet_address);
    // }

    if (user && socket) {
      socket.emit(
        "get_direct_conversations",
        { user_id: user?.wallet_address },
        (data) => {
          setConversationsData(data);
          console.log("DATA: ", data);

          // setMessagesList(data);
        }
      );
    }
  };

  useEffect(() => {
    console.log(socket, "socket1");
    if (!socket && !socket?.connected && user) {
      console.log("connecting.....");
      connectSocket(user.wallet_address);
    }
  }, [user, socket]);

  useEffect(() => {
    console.log(socket, "socket2");
    if (socket && socket.connected && user && freelancerAddr) {
      console.log("emitting", user, freelancerAddr);
      socket.emit(
        "start_conversation",
        {
          from: user?.wallet_address,
          to: freelancerAddr,
          gig_token_id: gigId,
        },
        (data) => {
          setConversationsData(data);
          if (data.length > 0) {
            setSelected(data[0]._id);
          }
          console.log("strat convo data", data);
          // setConversationsData(data);
        }
      );
      // socket.on("new_message", (data) => {
      //   // const message = data.message;
      //   console.log("current_conversation------->", data);
      // });
    }
  }, [user, freelancerAddr, socket, socket?.connected]);
  function toggleChatList() {
    document.querySelector(".sidebar").classList.toggle("left-[-350px]");
  }

  return (
    <div className="pt-5 bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900 h-screen">
      {user && (
        <>
          {conversationsData == null ? (
            <div
              className="
            flex items-center align-center justify-center flex-col z-50 h-screen
            "
            >
              <img src="loading.gif" height={80} width={80} />
            </div>
          ) : (
            <>
              <div className="p-4 sm:ml-80 mt-16 ">
                {selected != null ? (
                  <Chat
                    conversationsData={conversationsData}
                    setConversationsData={setConversationsData}
                    selected={selected}
                    conversations={
                      conversationsData.filter((c) => c._id == selected)[0]
                        .messages
                    }
                    to={
                      conversationsData.filter((c) => c._id == selected)[0]
                        .participants
                    }
                    setConversations={setConversations}
                    freelancerData={
                      conversationsData.filter((c) => c._id == selected)[0]
                        .freelancer[0]
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
              <NavDrawer
                conversationsData={conversationsData}
                setSelected={setSelected}
                toggleChatList={toggleChatList}
              />
            </>
          )}
        </>
      )}
      {!user && (
        <>
          <div className="min-h-[calc(70vh)] flex items-center justify-center flex-col absoluteCenter">
            <img
              src={"/empty.png"}
              alt=""
              className="w-1/4 h-1/4"
              style={{
                filter: "grayscale(1)",
              }}
            />
            <p className="text-center text-gray-800 font-bold">Please log in</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Conversation;
