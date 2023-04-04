package org.lamisplus.modules.casemanager.dto;

import lombok.Data;

@Data
public class CaseManagerRequest {
    private String designation;
    private String firstName;
    private String lastName;
    private String sex;
    private String phoneNumber;
    private Integer facilityId;
}
