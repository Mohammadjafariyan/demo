package bootstrap;

import org.activiti.engine.*;
import org.activiti.engine.identity.User;
import org.activiti.spring.SpringProcessEngineConfiguration;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import javax.sql.DataSource;


/*
@Configuration
@ComponentScan
@EnableAutoConfiguration
@SpringBootApplication*/

@Configuration
@ComponentScan("controllers")
@EnableAutoConfiguration
public class MyApplication {
    @Bean
    @Primary
    @Qualifier
    public DataSource processEngineConfiguration() {
        ProcessEngine processEngine = ProcessEngineConfiguration
                .createProcessEngineConfigurationFromResource("activiti.cfg.xml").buildProcessEngine();

        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setDriverClass(com.microsoft.sqlserver.jdbc.SQLServerDriver.class);
        dataSource.setUrl("jdbc:sqlserver://localhost\\SQLEXPRESS:1433;database=workflow");
        dataSource.setUsername("sa2");
        dataSource.setPassword("sa2");
        return dataSource;

        //return processEngine;
    }
    @Bean
    InitializingBean usersAndGroupsInitializer(final IdentityService identityService) {

        return new InitializingBean() {
            public void afterPropertiesSet() throws Exception {


                if(identityService.createUserQuery().userId("admin")==null){

                    User admin = identityService.newUser("admin");
                    admin.setPassword("admin");
                    identityService.saveUser(admin);
                }


            }
        };
    }

    public static void main(String[] args) {

        SpringApplication.run(MyApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(final RepositoryService repositoryService,
                                  final RuntimeService runtimeService,
                                  final TaskService taskService) {

        return new CommandLineRunner() {
            @Override
            public void run(String... strings) throws Exception {
                System.out.println("Number of process definitions : "
                        + repositoryService.createProcessDefinitionQuery().count());
                System.out.println("Number of tasks : " + taskService.createTaskQuery().count());
                runtimeService.startProcessInstanceByKey("oneTaskProcess");
                System.out.println("Number of tasks after process start: " + taskService.createTaskQuery().count());



            }
        };

    }
}