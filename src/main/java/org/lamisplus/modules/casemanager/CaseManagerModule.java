package org.lamisplus.modules.casemanager;

import com.foreach.across.config.AcrossApplication;
import com.foreach.across.core.AcrossModule;
import com.foreach.across.core.context.configurer.ComponentScanConfigurer;

@AcrossApplication(
		modules = {
		})
public class CaseManagerModule extends AcrossModule {
	public static final String NAME = "CaseManagerModule";

	public CaseManagerModule() {
		super ();
		addApplicationContextConfigurer (new ComponentScanConfigurer(
				getClass ().getPackage ().getName () + ".repository",
				getClass ().getPackage ().getName () + ".service",
				getClass ().getPackage ().getName () + ".mapper",
				getClass ().getPackage ().getName () + ".controller"
		));
	}
	@Override
	public String getName() {
		return NAME;
	}
}
