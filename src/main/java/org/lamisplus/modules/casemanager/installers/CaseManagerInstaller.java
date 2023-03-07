 package org.lamisplus.modules.casemanager.installers;

 import com.foreach.across.core.annotations.Installer;
 import com.foreach.across.core.installers.AcrossLiquibaseInstaller;

 @Installer(name = "schema-installer",
         description = "Installs the required database tables",
         version = 1)
 public class CaseManagerInstaller extends AcrossLiquibaseInstaller {
     public CaseManagerInstaller() {
         super("classpath:installers/casemanager/schema/schema.xml");
     }
 }
