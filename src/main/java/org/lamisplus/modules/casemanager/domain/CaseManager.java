package org.lamisplus.modules.casemanager.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "case_manager")
public class CaseManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "uuid", nullable = false, unique = true, updatable = false)
    private String uuid;
    @Column(name = "designation")
    private String designation;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "sex")
    private String sex;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "facility_id")
    private Long facilityId;
    @Column(name = "create_date")
    private LocalDateTime createDate;
    @JoinColumn(name = "case_manager_Id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignedPatient> patients = new ArrayList<>();
}
