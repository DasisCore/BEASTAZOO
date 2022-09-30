import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";


import RecentlyCollections from "../../layouts/main/RecentlyCollections";
import Marketplace from "../../layouts/main/Marketplace";
import CollectorRanking from "../../layouts/main/CollectorRanking";
import SeasonCarousel from "../../layouts/main/SeasonCarousel";
import FAQ from "../../layouts/main/FAQ";

import banner from "../../image/mainPage/banner.png";
import guide from "../../image/mainPage/guide.png";

const MainPage = () => {
  const navigate = useNavigate();
  
  const userNickname = sessionStorage.getItem('nickname');


  return (
    <div className={styles.mainBody}>
      <Box sx={{ width: "75%", margin: "1% 12.5% 3% 12.5%" }}>
        { sessionStorage.getItem("isLogined") && <p className={styles.welcome}>Welcome, {userNickname}</p>}
        <div className={styles.mainBanner}>
          <img src={banner} alt="banner" onClick={() => {navigate("/market/draw")}} className={styles.banner} />
          <img src={guide} alt="banner" className={styles.guide} />
        </div>
        <RecentlyCollections />
        <Marketplace />
        <CollectorRanking />
        <SeasonCarousel />
        <FAQ />
      </Box>
    </div>
  );
};

export default MainPage;
