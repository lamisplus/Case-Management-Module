package org.lamisplus.modules.casemanager.repository;

import org.lamisplus.modules.casemanager.domain.CaseManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseManagerRepository extends JpaRepository<CaseManager, Integer> {
}
