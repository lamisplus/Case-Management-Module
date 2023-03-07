package org.lamisplus.modules.casemanager.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.casemanager.domain.CaseManager;
import org.lamisplus.modules.casemanager.dto.CaseManagerDTO;
import org.lamisplus.modules.casemanager.dto.CaseManagerRequest;
import org.lamisplus.modules.casemanager.service.CaseManagerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/casemanager")
public class CaseManagerController {
    private final CaseManagerService caseManagerService;

    @PostMapping("/create")
    public CaseManager SaveCaseManger(@RequestBody CaseManagerRequest caseManagerRequest) throws Exception {
        return caseManagerService.Save(caseManagerRequest);
    }

    @PutMapping("/update/{id}")
    public CaseManager UpdateCaseManger(@PathVariable int id, @RequestBody CaseManagerRequest caseManagerRequest) throws Exception {
        return caseManagerService.Update(caseManagerRequest, id);
    }

    @GetMapping("/get/{id}")
    public CaseManagerDTO GetCaseManagerById(@PathVariable int id){
        return caseManagerService.FindById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String DeleteCaseManager(@PathVariable int id) throws Exception {
        return caseManagerService.Delete(id);
    }

    @GetMapping("/list")
    public List<CaseManagerDTO> GetConfig(){
        boolean emptyCheck = caseManagerService.FindAll().isEmpty();

        if (emptyCheck != true) {
            return caseManagerService.FindAll();
        }
        return null;
    }
}
