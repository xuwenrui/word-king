package com.wordking.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PronunciationResponse {
    private Long wordId;
    private String audioUrl;
    private String phonetic;
}
