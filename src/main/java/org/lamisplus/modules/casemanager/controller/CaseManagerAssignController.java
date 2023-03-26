package org.lamisplus.modules.casemanager.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.casemanager.domain.AssignCaseManager;
import org.lamisplus.modules.casemanager.domain.AssignedPatient;
import org.lamisplus.modules.casemanager.dto.AssignCaseManagerDTO;
import org.lamisplus.modules.casemanager.service.AssignCaseMangerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/assign")
public class CaseManagerAssignController {
    private final AssignCaseMangerService assignCaseMangerService;

    @PostMapping("/create")
    public AssignCaseManager SaveCaseManger(@RequestBody AssignCaseManagerDTO assignCaseManagerDTO) throws Exception {
        return assignCaseMangerService.save(assignCaseManagerDTO);
    }

    @GetMapping("/list")
    public List<AssignCaseManager> getAllAssigned() {
        return assignCaseMangerService.findAll();
    }
}
