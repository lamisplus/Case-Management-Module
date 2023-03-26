package org.lamisplus.modules.casemanager.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "case_manager_patients")
public class AssignedPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "sex")
    private String sex;
    @Column(name = "current_status")
    private String currentStatus;
    @Column(name = "hospital_no")
    private String hospitalNo;
    @Column(name = "age")
    private String age;
    @Column(name = "facility_Id")
    private String facilityId;
    @Column(name = "biometric_status")
    private String biometricStatus;
    @Column(name = "person_uuid")
    private String personUuid;
    @Column(name = "date_of_birth")
    private String dob;
    @Column(name = "case_manager_assigned_Id")
    private Integer caseManagerAssignId;
}
