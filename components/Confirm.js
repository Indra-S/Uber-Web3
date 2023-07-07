import RideSelector from "./RideSelector";
import { useContext, useState } from "react";
import { UberContext } from "../context/uberContext";
import { ethers } from "ethers";
import okayed from '../assets/okay.png'
import Image from 'next/image'

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-auto scrollbar-hide mb-20`,
  confirmButtonContainer: ` cursor-pointer z-20 absolute bottom-[5px] bg-white left-0 right-0`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
  popupContainer: `fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`,
  popup: `bg-white p-8 text-xl text-center justify-center`,
};

const Confirm = () => {
  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,
  } = useContext(UberContext);

  const [transactionStatus, setTransactionStatus] = useState(null);

  const storeTripDetails = async (pickup, dropoff) => {
    try {
      await fetch("/api/db/saveTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          price: price,
          selectedRide: selectedRide,
        }),
      });

      const transaction = await metamask
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
              gas: "0x7EF40", // 520000 Gwei
              value: ethers.utils.parseEther(price)._hex,
            },
          ],
        })

      setTransactionStatus("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropoffCoordinates && <RideSelector />}
      </div>
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => {
              storeTripDetails(pickup, dropoff);
            }}
          >
            Confirm {selectedRide.service || "UberX"}
          </div>
        </div>
      </div>
      {transactionStatus === "success" && (
        <div className={style.popupContainer}>
          <div className={style.popup} style={{ flexDirection: "column" }}>
            <Image
              src={okayed}
              alt="Transaction successful"
              className={style.successImage}
              height={60} width={60}
            />
            <h1 style={{fontWeight: "bold"}}>Awesome!</h1>
            <h4>Your order has been placed successfully</h4>
            <button onClick={() => setTransactionStatus(null)} style={{
              backgroundColor: "#7ED957",
              color: "white",
              width: "120px",
              marginTop: "16px",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            >OK</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Confirm;
