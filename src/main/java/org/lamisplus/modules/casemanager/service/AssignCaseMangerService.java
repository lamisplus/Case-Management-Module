package org.lamisplus.modules.casemanager.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.casemanager.domain.AssignCaseManager;
import org.lamisplus.modules.casemanager.domain.AssignedPatient;
import org.lamisplus.modules.casemanager.dto.AssignCaseManagerDTO;
import org.lamisplus.modules.casemanager.repository.AsignPatientRepository;
import org.lamisplus.modules.casemanager.repository.AssignCaseManagerRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AssignCaseMangerService {
    private final AssignCaseManagerRepository assignCaseManagerRepository;
    private final AsignPatientRepository asignPatientRepository;

    public AssignCaseManager save(AssignCaseManagerDTO assignCaseManagerDTO) {
        try {
            AssignCaseManager assignCaseManager = new AssignCaseManager();
            assignCaseManager.setAssignDate(assignCaseManagerDTO.getAssignDate());
            assignCaseManager.setCaseManager(assignCaseManagerDTO.getCaseManager());
            assignCaseManager.setState(assignCaseManagerDTO.getState());
            assignCaseManager.setLga(assignCaseManagerDTO.getLga());
            AssignCaseManager createdCasemanger = assignCaseManagerRepository.save(assignCaseManager);

            List<AssignedPatient> assignedPatients = new ArrayList<>();

            for(AssignedPatient patient: assignCaseManagerDTO.getPatients()) {
               assignedPatients.add(dtoToEntity(patient, createdCasemanger));
            }

            asignPatientRepository.saveAll(assignedPatients);

            return createdCasemanger;

        }catch (Exception ignored) {
            return null;
        }
    }

    private static AssignedPatient dtoToEntity(AssignedPatient patient, AssignCaseManager assignCaseManager){
        AssignedPatient assignedPatient = new AssignedPatient();
        assignedPatient.setAge(patient.getAge());
        assignedPatient.setSex(patient.getSex());
        assignedPatient.setCurrentStatus(patient.getCurrentStatus());
        assignedPatient.setHospitalNo(patient.getHospitalNo());
        assignedPatient.setDob(patient.getDob());
        assignedPatient.setBiometricStatus(patient.getBiometricStatus());
        assignedPatient.setFullName(patient.getFullName());
        assignedPatient.setFacilityId(patient.getFacilityId());
        assignedPatient.setCaseManagerAssignId(assignCaseManager.getId());
        return assignedPatient;
    }

    public List<AssignCaseManager> findAll()
    {
        return assignCaseManagerRepository.findAll();
    }

}
