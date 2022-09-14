package com.nft.jav.data.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class CombiReqDto {

    private long user_id;
    private String nft_address;
    private long nft_id_1;
    private long nft_id_2;

    @Builder
    public CombiReqDto(long user_id, String nft_address, long nft_id_1, long nft_id_2) {
        this.user_id = user_id;
        this.nft_address = nft_address;
        this.nft_id_1 = nft_id_1;
        this.nft_id_2 = nft_id_2;
    }
}
