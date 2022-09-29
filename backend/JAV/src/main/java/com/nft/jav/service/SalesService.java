package com.nft.jav.service;

import com.nft.jav.data.dto.*;

import java.util.List;

public interface SalesService {
    List<SalesResPageDto> getSales(String search, int page, int size, int type, int sort);

    List<SalesResDto> getUserSalesList(String wallet_address);

    List<SalesResDto> getUserPurchaseList(String wallet_address);

    PurchaseResDto purchaseNFT(PurchaseReqDto purchaseReqDto);

    SalesResDto saleNFT(SalesReqDto salesReqDto);

    SalesResDto getSale(long sale_id);

    List<SalesResDto> getSaleByJavCodeCompleted(String jav_code);

    boolean deleteCommunity(String contract_address);
}
