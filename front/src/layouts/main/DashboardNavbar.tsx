import { useEffect, useState } from "react";
import { Box, Stack, Button, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import Logo from '../../components/Logo';

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import Login from "../Login";
import Metamask from "../../image/WalletLogo/Metamask_logo.svg";
import Coinbase from "../../image/WalletLogo/Coinbase_logo.svg";
import WalletConnect from "../../image/WalletLogo/WalletConnect_logo.svg";
import Logout from "../Logout";

import BEASTAZOO_logo from "../../image/BEASTAZOO_logo.svg";
import JAV from "../../image/JAV.svg";
import styles from "./DashboardNavbar.module.scss";
import NavHamburger from "./NavHamburger";
import { BalanceOfJavToken, CreateJavToken } from "../../common/ABI";
import convertToAccountingFormat from "../../utils/NumberFormatter";

const actions = [{ icon: <Logout />, name: "Logout" }];

// 헤더 화면 (상단 메뉴바)
const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [copy, setCopy] = useState("copy");

  const isLogined = sessionStorage.getItem("isLogined");
  const nickname = sessionStorage.getItem("nickname");
  const profileImgPath = sessionStorage.getItem("profileImgPath");

  const copyHandler = () => {
    navigator.clipboard.writeText(account);
    setCopy("copied!");
  };

  // drawer
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerState(open);
    };

  ///

  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setAccount(accounts[0]);
    getBalance(accounts[0]);
  };

  const getBalance = async (account: string) => {
    BalanceOfJavToken(account)
    .then((res) => {
      const formatting = convertToAccountingFormat(res)
      setBalance(formatting)
    }) .catch((err) => {
      console.log(err)
    })
  };

  const javCharge = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    await CreateJavToken(account)
    await getBalance(account)
  }

  useEffect(() => {
    if (isLogined) {
      getAccount();
    }
  }, [isLogined]);

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div className={styles.myWallet}>
          <div className={styles.wallet}>
            {profileImgPath ? (
              <img
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 100,
                  objectFit: "cover",
                }}
                src={profileImgPath}
                alt=""
              />
            ) : (
              // <Avatar alt="Travis Howard" src={profileExample} />
              <AccountCircleIcon sx={{ fontSize: 35, color: "black" }} />
            )}
            <div>My wallet</div>
          </div>
          <div>
            {account ? (
              <Tooltip
                title={
                  <div style={{ fontSize: "12px", fontWeight: 500 }}>
                    {copy}
                  </div>
                }
              >
                <Button
                  onClick={copyHandler}
                  sx={{ fontWeight: 700, color: "#B8B8B8" }}
                  onMouseOut={() => {
                    setCopy("copy");
                  }}
                  onMouseOver={() => {
                    setCopy("copy");
                  }}
                >
                  {account.toString().slice(0, 6) +
                    "..." +
                    account.toString().slice(38, 42)}
                </Button>
              </Tooltip>
            ) : (
              <></>
            )}
          </div>
        </div>
      </List>

      {isLogined === "true" ? (
        <div className={styles.balanceTable}>
          <div className={styles.myBalance}>
            <div className={styles.Btable}>
              <div className={styles.balance}>
                <div>My JAV</div>
                <div>
                  <img src={JAV} alt="" />
                  <div>{balance} JAV</div>
                </div>
              </div>
            </div>
            <div className={styles.charge} onClick={javCharge}>충전하기</div>
          </div>
        </div>
      ) : (
        <List>
          <div className={styles.noLogined}>
            <div>아직 지갑이 연결되지 않았습니다.</div>
            <div>MetaMask를 이용하여 지갑을 연결해주세요.</div>
          </div>
          <Paper
            variant="outlined"
            sx={{
              width: 356,
              height: 200,
              maxWidth: "100%",
              margin: "0 1.4rem 1.5rem 1.4rem",
              border: "2px solid #E5E8EB",
              borderRadius: "10px",
            }}
          >
            <List style={{ padding: 0 }}>
              <ListItem style={{ padding: 0, height: "4rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 1rem 0 1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img style={{ width: "25px" }} src={Metamask} alt="" />
                    <div style={{ margin: "0 0 0 10px", fontWeight: 700 }}>
                      Metamask
                    </div>
                  </div>
                  <Login />
                </div>
              </ListItem>
              <Divider sx={{ border: "1px solid #E5E8EB" }} />
              <ListItem style={{ padding: 0, height: "4rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 1rem 0 1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img style={{ width: "25px" }} src={Coinbase} alt="" />
                    <div style={{ margin: "0 0 0 10px", fontWeight: 700 }}>
                      Coinbase Wallet
                    </div>
                  </div>
                  <Button variant="contained" disabled>
                    지원 예정
                  </Button>
                </div>
              </ListItem>
              <Divider sx={{ border: "1px solid #E5E8EB" }} />
              <ListItem style={{ padding: 0, height: "4rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 1rem 0 1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img style={{ width: "25px" }} src={WalletConnect} alt="" />
                    <div style={{ margin: "0 0 0 10px", fontWeight: 700 }}>
                      WalletConnect
                    </div>
                  </div>
                  <Button variant="contained" disabled>
                    지원 예정
                  </Button>
                </div>
              </ListItem>
            </List>
          </Paper>
          <Divider />
          <div className={styles.walletExplain}>
            <div>현재 BESTAZOO에서는 </div>
            <div>개인 지갑을 편리하고 안전하게 관리할 수 있는</div>
            <div>Metamask를 이용하여 로그인합니다.</div>
            <br />
            <div>만약 Metamask가 설치되지 않았다면</div>
            <div> 설치페이지로 이동합니다.</div>
          </div>
        </List>
      )}
    </Box>
  );

  return (
    <div className={styles.navContainer}>
      <div className={styles.logoStyle}>
        <RouterLink to="/">
          <img src={BEASTAZOO_logo} alt="beastazoo_logo" />
        </RouterLink>
      </div>

      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0.5, sm: 6.5 }}
        sx={{ fontWeight: "bold" }}
        className={styles.contents}
      >
        <Link
          to={"/market"}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          마켓
        </Link>
        <Link
          to={`/market/draw`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          뽑기
        </Link>
        <Link
          to={`/market/combine`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          조합
        </Link>
        <div>도감</div>

        {isLogined === "true" ? (
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              "& .MuiFab-primary": { width: 35, height: 35 },
              position: "relative",
              top: "32px",
            }}
            icon={
              <img
                onClick={() => {
                  navigate(`/user/${account}`);
                }}
                style={{
                  width: 37,
                  height: 37,
                  borderRadius: 100,
                  objectFit: "cover",
                }}
                src={
                  profileImgPath
                    ? profileImgPath
                    : "https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTc5/MDAxNTIwMDQxNzQwODYx.qQDg_PbRHclce0n3s-2DRePFQggeU6_0bEnxV8OY1yQg.4EZpKfKEOyW_PXOVvy7wloTrIUzb71HP8N2y-YFsBJcg.PNG.osy2201/1_%2835%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800"
                }
                alt=""
              />
            }
            direction="down"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement={"right"}
                sx={{ width: 40, height: 40 }}
              />
            ))}
          </SpeedDial>
        ) : (
          <AccountCircleOutlinedIcon
            onClick={toggleDrawer(true)}
            sx={{ fontSize: 35, color: "black", cursor: "pointer" }}
          />
        )}

        <div>
          <Button
            sx={{ padding: 0, minWidth: 35 }}
            onClick={toggleDrawer(true)}
          >
            <AccountBalanceWalletOutlinedIcon
              sx={{ fontSize: 35, color: "black" }}
            />
          </Button>
          <Drawer
            anchor={"right"}
            open={drawerState}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </div>
      </Stack>
      <NavHamburger walletDrawer={toggleDrawer(true)} account={account} />
    </div>
  );
};

export default DashboardNavbar;
