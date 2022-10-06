import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchItems } from "../../api/market";
import { MotionContainer, varBounceIn } from "../../components/animate";
import { Product } from "../../layouts/items/ItemsCard";
import ItemsList from "../../layouts/items/ItemsList";

interface Props {
  page: number;
  size: number;
  search: string;
  haveCompleted: number;
  sort: number;
  setTotalPage?: Function;
}

const Items = ({
  page,
  size,
  search,
  haveCompleted,
  sort,
  setTotalPage,
}: Props) => {
  const [item, setItem] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  /**
   * 프로젝트 구현
   * 1. 구매하기 클릭 시 해당 자브종을 조회하기 위해 API를 호출합니다.
   * 2. 응답으로부터 받은 token id로 Sale(판매) 정보를 요청합니다.
   * 3. sale 컨트랙트 주소로 즉시 구매가를 컨트랙트로부터 직접 조회합니다.
   * 4. token id로 NFT 컨트랙트로부터 직접 tokenURI를 조회하여 화면에 표시합니다.
   */

  const getItem = async () => {
    // TODO
    setLoading(true);

    fetchItems(page - 1, size, search, haveCompleted, sort).then((res) => {
      if (res.length !== 0) {
        const resultList = [] as Product[];
        if (setTotalPage) {
          setTotalPage(res[0].total_page);
        }
        res.map((item: any) =>
          resultList.push({
            saleId: item.sale_id,
            url: item.img_address,
            nftId: item.nft_id,
            javCode: item.jav_code,
            sellerWallet: item.seller_wallet,
            sellerNickname: item.seller_nickname,
            buyerWallet: item.buyer_wallet,
            buyerNickname: item.buyer_nickname,
            price: item.price,
            saleStartDate: item.sale_start_date,
            saleCompletedDate: item.sale_completed_date,
            contractAddress: item.contract_address,
            state: item.state,
          })
        );
        setItem(resultList);
      } else {
        if (setTotalPage) {
          setTotalPage(0);
        }
        setItem([]);
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    getItem();
  }, [search, haveCompleted, sort, page]);

  return (
    <div>
      {loading === false ? (
        <>
          {item.length !== 0 ? (
            <Container maxWidth="xl">
              <ItemsList sx={{ mt: 1 }} products={item} />
            </Container>
          ) : (
            <Container>
              <MotionContainer initial="initial" sx={{ mt: 10 }} open>
                <Box
                  sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}
                >
                  <motion.div variants={varBounceIn}>
                    <Typography variant="h3" paragraph>
                      검색 결과 없음
                    </Typography>
                  </motion.div>
                  <Typography sx={{ color: "text.secondary" }}>
                    판매되고 있는 아이템이 없습니다.
                  </Typography>
                  {/* <motion.div variants={varBounceIn}>
                    <Box
                      component="img"
                      src="/static/illustrations/illustration_register.png"
                      sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                    />
                  </motion.div> */}
                </Box>
              </MotionContainer>
            </Container>
          )}
        </>
      ) : (
        <Container>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <Typography variant="h3" paragraph>
              아이템 로딩중...
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              판매되고 있는 아이템을 검색하고 있습니다.
            </Typography>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default Items;
