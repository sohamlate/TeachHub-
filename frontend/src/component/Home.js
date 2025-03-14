import React from "react";
import { motion } from "framer-motion";
// import SocialMedia from "../../components/socialMedia/SocialMedia";
// import Button from "../../components/button/Button";
import { greeting } from "../portfolio";
// import FeelingProud from "./FeelingProud";
import { chosenTheme } from "../theme";

export default function Greeting({ theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="w-[90%] px-2 py-5 mx-auto mt-8"
      id="greeting"
    >
      <div className="flex flex-col md:flex-row items-center ">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-bold" style={{ color: chosenTheme.text }}>
            {greeting.title}
          </h1>
          {greeting.nickname && (
            <h2 className="text-2xl font-semibold mt-2" style={{ color: chosenTheme.text }}>
              ( {greeting.nickname} )
            </h2>
          )}
          <p className="text-2xl mt-4" style={{ color: chosenTheme.secondaryText }}>
            {greeting.subTitle}
          </p>
          {/* <SocialMedia theme={theme} /> */}
          <div className="mt-6 flex justify-center md:justify-start">
            {/* <Button
              text="⭐ Star Me On Github"
              newTab={true}
              href={greeting.portfolio_repository}
              theme={theme}
              className="btn"
            /> */}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            alt="saad sitting on table"
            src="https://res.cloudinary.com/dsy3ebkqc/image/upload/v1741950681/Huehub/djqxmnll91761qftb6ru.png"
            className="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-auto rounded-lg "
          />
        </div>
      </div>
    </motion.div>
  );
}
