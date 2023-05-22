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
    private Long facilityId;
    @Column(name = "biometric_status")
    private String biometricStatus;
    @Column(name = "person_uuid")
    private String personUuid;
    @Column(name = "date_of_birth")
    private String dob;
    @Column(name = "phone_number")
    private String phone;
    @Column(name = "state")
    private String state;
    @Column(name = "lga")
    private String lga;
    @Column(name = "case_manager_Id")
    private Integer caseManagerId;
    @Column(name = "date_assigned")
    private LocalDateTime date_assigned;
    @Column(name = "date_created")
    private LocalDateTime date_created;
    @Column(name = "date_modified")
    private LocalDateTime date_modified;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "modified_by")
    private String modifiedBy;
    @Column(name = "action")
    private String action;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "create_date")
    private LocalDateTime createDate;
}
