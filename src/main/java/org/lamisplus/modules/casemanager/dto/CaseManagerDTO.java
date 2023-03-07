package org.lamisplus.modules.casemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CaseManagerDTO {
    private Integer id;
    private String designation;
    private String firstName;
    private String lastName;
    private String sex;
    private String phoneNumber;
    private String uuid;
    private LocalDateTime createDate;
}
