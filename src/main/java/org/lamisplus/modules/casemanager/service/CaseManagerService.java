package org.lamisplus.modules.casemanager.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.casemanager.domain.CaseManager;
import org.lamisplus.modules.casemanager.dto.CaseManagerDTO;
import org.lamisplus.modules.casemanager.dto.CaseManagerRequest;
import org.lamisplus.modules.casemanager.dto.PatientListDTO;
import org.lamisplus.modules.casemanager.repository.AsignPatientRepository;
import org.lamisplus.modules.casemanager.repository.CaseManagerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CaseManagerService {
    private final AsignPatientRepository asignPatientRepository;
    private final CaseManagerRepository caseManagerRepository;

    private final CaseManagerDTOMapper caseManagerDTOMapper;

    public CaseManager Save(CaseManagerRequest caseManagerRequest) throws Exception {
        CaseManager caseManagerobj = new CaseManager();
        caseManagerobj.setDesignation(caseManagerRequest.getDesignation());
        caseManagerobj.setFirstName(caseManagerRequest.getFirstName());
        caseManagerobj.setLastName(caseManagerRequest.getLastName());
        caseManagerobj.setSex(caseManagerRequest.getSex());
        caseManagerobj.setPhoneNumber(caseManagerRequest.getPhoneNumber());
        caseManagerobj.setFacilityId(caseManagerRequest.getFacilityId());
        caseManagerobj.setUuid(UUID.randomUUID().toString());
        caseManagerobj.setCreateDate(LocalDateTime.now());

        return caseManagerRepository.save(caseManagerobj);
    }

    public CaseManager Update(CaseManagerRequest caseManagerRequest, int id) throws Exception {

            CaseManager existingCaseManager = caseManagerRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException(
                            "Case manager not found"
                    ));

            if (existingCaseManager != null) {
                existingCaseManager.setDesignation(caseManagerRequest.getDesignation());
                existingCaseManager.setFirstName(caseManagerRequest.getFirstName());
                existingCaseManager.setLastName(caseManagerRequest.getLastName());
                existingCaseManager.setSex(caseManagerRequest.getSex());
                existingCaseManager.setPhoneNumber(caseManagerRequest.getPhoneNumber());
                existingCaseManager.setFacilityId(caseManagerRequest.getFacilityId());

                return caseManagerRepository.save(existingCaseManager);
            }else {
                throw new Exception(id + " not found");
            }
    }
    public CaseManagerDTO FindById(Integer id){
        return caseManagerRepository.findById(id)
                .map(caseManagerDTOMapper)
                .orElseThrow(() -> new NoSuchElementException(
                        "Case manager not found"
                ));
    }

    public String Delete(Integer id){
        caseManagerRepository.deleteById(id);
        return " deleted successfully";
    }
    public List<CaseManagerDTO> FindAll(){
        return caseManagerRepository.findAll()
                .stream()
                .map(caseManagerDTOMapper)
                .collect(Collectors.toList());
    }
    public List<PatientListDTO> getPatientListDTOS(Long facilityId, String stateOfResidence, String lgaOfResidence,
                                            String gender,
                                            String targetGroup) {
        
        if(stateOfResidence.isEmpty() && lgaOfResidence.isEmpty() && gender.isEmpty() && targetGroup.isEmpty()){
            System.out.println(1);
            return asignPatientRepository.getPatientListDTOsByFacility(facilityId);
            
        }
        if(!stateOfResidence.isEmpty() && !lgaOfResidence.isEmpty() && !gender.isEmpty() ){
            System.out.println(2);
            return asignPatientRepository.getPatientListDTOsByFacilityAndStateAndLgaAndGender(facilityId, stateOfResidence,lgaOfResidence,gender);
        }
        if(!stateOfResidence.isEmpty() && !lgaOfResidence.isEmpty() && !targetGroup.isEmpty() ){
            System.out.println(3);
            return asignPatientRepository.getPatientListDTOsByFacilityAndStateAndLgaAndTargetGroup(facilityId, stateOfResidence,lgaOfResidence,targetGroup);
        }
    
     // state
        if(!stateOfResidence.isEmpty() && !lgaOfResidence.isEmpty() ){
            System.out.println(4);
            return asignPatientRepository.getPatientListDTOsByFacilityAndStateAndLga(facilityId, stateOfResidence,lgaOfResidence);
        }
        
        if(!stateOfResidence.isEmpty() && !gender.isEmpty()){
            System.out.println(5);
            return asignPatientRepository.getPatientListDTOsByFacilityAndStateAndGender(facilityId,stateOfResidence,gender);
        }
    
       
        if(!stateOfResidence.isEmpty() && !targetGroup.isEmpty()){
            System.out.println(6);
            return asignPatientRepository.getPatientListDTOsByFacilityAndStateAndTargetGroup(facilityId,stateOfResidence,targetGroup);
        }
    
      
    //lga
    
        if( !lgaOfResidence.isEmpty() && !gender.isEmpty() ){
            System.out.println(7);
            return asignPatientRepository.getPatientListDTOsByFacilityAndLgaAndGender(facilityId, lgaOfResidence, gender);
        }
        
        if(!lgaOfResidence.isEmpty() && !gender.isEmpty()){
            System.out.println(8);
            return asignPatientRepository.getPatientListDTOsByFacilityAndLgaAndGender(facilityId,stateOfResidence,gender);
        }
        
        if(!lgaOfResidence.isEmpty() && !targetGroup.isEmpty()){
            System.out.println(9);
            return asignPatientRepository.getPatientListDTOsByFacilityAndLgaAndTargetGroup(facilityId,stateOfResidence,targetGroup);
        }
    
        if( !lgaOfResidence.isEmpty() && !gender.isEmpty() ){
            System.out.println(10);
            return asignPatientRepository.getPatientListDTOsByFacilityAndLgaAndGender(facilityId, lgaOfResidence,gender);
        }
        
        
        if(!targetGroup.isEmpty() ){
            System.out.println(11);
            return asignPatientRepository.getPatientListDTOsByFacilityAndTargetGroup(facilityId,targetGroup);
        }
        if(!lgaOfResidence.isEmpty()){
            System.out.println(12);
          return   asignPatientRepository.getPatientListDTOsByFacilityAndLgaOfResidence(facilityId, lgaOfResidence);
        }
        
        if(!stateOfResidence.isEmpty()){
            System.out.println(13);
           return asignPatientRepository.getPatientListDTOsByFacilityAndStateOfResidence(facilityId,stateOfResidence);
        }
       
        if(!gender.isEmpty()){
            System.out.println(14);
            return  asignPatientRepository.getPatientListDTOsByFacilityAndGender(facilityId, gender);
        }
        System.out.println(15);
       return asignPatientRepository.getPatientListDTOs(facilityId, stateOfResidence, lgaOfResidence,gender,targetGroup);
    }
}
