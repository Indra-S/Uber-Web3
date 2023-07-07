import Navbar from "../components/Navbar";

import Image from "next/image";
import facebook from "./icons/facebook.png";
import twitter from "./icons/twitter.png";
import instagram from "./icons/instagram.png"
import Link from "next/link";

const Contact = () => {

  return (
    <section className="contact">
      <Navbar />
      <div className=" bg-light-yellow py-20">
        <div className="custom-container flex flex-col lg:grid grid-cols-3 items-center gap-12 lg:gap-4">
          <div className="custom-container flex flex-col gap-6 w-[300px]">
            <div>
              <h2 className="font-bold text-4xl w-[80%] lg:w-full">
                Contact Us
              </h2>
              <p className="text-sm">
                If you would like to talk about your upcoming event, please feel
                free to contact us anytime
              </p>
            </div>
            <div>
              <h3 className="uppercase font-semibold mb-4 text-xl tracking-wide">
                Socials
              </h3>
              <div className="flex gap-4">
                <Image
                  src={facebook}
                  alt="Facebook Logo"
                  width={20}
                  height={20}
                />

                <Image
                  src={twitter}
                  alt="Twitter Logo"
                  width={20}
                  height={20}
                />

                <Image
                  src={instagram}
                  alt="Instagram Logo"
                  width={20}
                  height={20}
                />
                
              </div>
            </div>
          </div>
          <div className="shadow-xl py-4 px-8 col-span-2 w-full">
            <h2 className="font-bold text-4xl mb-6">Send some feedback!</h2>
            <form>
              <div className="control-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" name="name" id="name" />
              </div>
              {/* Stars Input--------------------------------------------------------------- */}
              <div className="control-group">
                <label htmlFor="feedback">Your Feedback</label>
                <textarea
                  name="feedback"
                  id="feedback"
                  cols="30"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-end w-full py-4">
                <Link href="mailto:coderweb3pro@gmail.com" className="button bg-yellow" ><a>send</a></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
