package org.lamisplus.modules.casemanager.repository;

import org.lamisplus.modules.casemanager.domain.AssignCaseManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignCaseManagerRepository extends JpaRepository<AssignCaseManager, Integer> {
}
