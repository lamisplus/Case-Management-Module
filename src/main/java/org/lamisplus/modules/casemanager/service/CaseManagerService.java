package org.lamisplus.modules.casemanager.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.casemanager.domain.CaseManager;
import org.lamisplus.modules.casemanager.dto.CaseManagerDTO;
import org.lamisplus.modules.casemanager.dto.CaseManagerRequest;
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
}
