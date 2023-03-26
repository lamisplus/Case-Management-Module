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
@Table(name = "case_manager_assigned")
public class AssignCaseManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "assign_date")
    private String assignDate;
    @Column(name = "case_manager")
    private String caseManager;
    @Column(name = "state")
    private String state;
    @Column(name = "lga")
    private String lga;

    @JoinColumn(name = "case_manager_assigned_Id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignedPatient> patients = new ArrayList<>();
}
