package org.lamisplus.modules.casemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.casemanager.domain.AssignedPatient;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignCaseManagerDTO {
    private String assignDate;
    private String caseManager;
    private String state;
    private String lga;
    private List<AssignedPatient> patients;

}
