package org.lamisplus.modules.casemanager.dto;

import java.time.LocalDate;

public interface PatientListDTO {
	
	Long getFacilityId();
	
	String getDatimId();
	
	String getFacilityName();
	
	String getState();
	
	String getLga();
	
	String getPersonUuid();
	
	String getHospitalNumber();
	
	// String uniqueID;
	
	String getSurname();
	
	String getOtherName();
	
	String getFirstName();
	
	LocalDate getDateOfBirth();
	
	Integer getAge();
	
	String getGender();
	
	String getStatus();
	
	String getMaritalStatus();
	
	String getEducation();
	
	String getOccupation();
	
	String getResidentialState();
	
	String getResidentialLga();
	
	String getAddress();
	
	String getPhone();
	String getTargetGroup();
	
}
