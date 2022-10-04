import { Link as RouterLink } from "react-router-dom";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import JAV from "../../image/JAV.svg"

export interface Product {
  url: string;
  price: number;
  nftId: number;
  javCode: string;
  buyerWallet: string;
  buyerNickname: string;
  sellerWallet: string;
  sellerNickname: string;
  saleId: number;
  saleStartDate: string;
  saleCompleteDate: string;
  contractAddress: string;
  state: number;
}

const ImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  transition: "all 0.5s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const ItemsCard = ({ product }: { product: Product }) => {
  const { url, price, state, saleId, sellerNickname, nftId } = product;
  const symbol = "JAV";

  return (
    <Link
      to={`/market/buy/${saleId}`}
      // color="inherit"
      underline="none"
      component={RouterLink}
    >
      <Card sx={{ borderRadius: "10px" }}>
        <Box sx={{ pt: "100%", position: "relative", overflow: "hidden" }}>
          <ImgStyle src={url} />
        </Box>
        <Stack sx={{ p: 2 }}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{fontWeight: "700"}}>Season 1 - OOZ Project</div>
            <div style={{fontSize: "0.8rem", fontWeight: "700", color: "gray"}}>#{nftId}</div>
          </div>

          <Typography variant="subtitle1" noWrap sx={{fontSize: "0.9rem"}}>
            {sellerNickname}
          </Typography>

          <Typography variant="subtitle1" noWrap sx={{fontSize: "0.8rem", fontWeight: "700", color: "gray", marginTop: "2rem"}}>
            가격
          </Typography>

          <Typography noWrap sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Typography variant="subtitle1" sx={{ display: "flex" , fontSize: "1.2rem", fontWeight: "700", alignItems: "center"}}>
              <img style={{width: "1.3rem", marginRight: "0.5rem"}} src={JAV} alt="" /> {price} {symbol}
            </Typography>
            <Typography noWrap sx={state === 0 ? { color: "#B6B6B6", fontWeight: "700" } : { color: "#FFC42E", fontWeight: "700" }}>
              {state === 0 ? "판매 중" : "품절"}
            </Typography>
          </Typography>
        </Stack>
      </Card>
    </Link>
  );
};

export default ItemsCard;
