package bootstrap;

import org.activiti.engine.*;
import org.activiti.engine.identity.User;
import org.activiti.spring.SpringProcessEngineConfiguration;
import org.apache.log4j.Logger;
import org.apache.log4j.spi.LoggerFactory;
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

import java.util.Properties;

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
    private static final Logger LOGGER = Logger.getLogger(MyApplication.class); // LoggerFactory.getLogger(MyApplication.class.getName());

    @Bean
    @Primary
    @Qualifier
    public DataSource processEngineConfiguration() throws Exception {
        // ProcessEngine processEngine = ProcessEngineConfiguration
        // .createProcessEngineConfigurationFromResource("activiti.cfg.xml").buildProcessEngine();

        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setDriverClass(com.microsoft.sqlserver.jdbc.SQLServerDriver.class);

        Properties properties = MyConfig.fetchProperties();

        if (properties.getProperty("url") == null)
            throw new Exception(" url is null " + properties.size());
        String url = (String) properties.getProperty("url");
        String username = (String) properties.getProperty("username");
        String password = (String) properties.getProperty("password");
        LOGGER.info("url: " + url);
        LOGGER.info("username:" + username);
        LOGGER.info("password" + password);

        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // dataSource.setUrl("jdbc:sqlserver://ATA-PC\\ATA-PCSQL2014:1433;database=workflow");
        // dataSource.setUsername("sa");
        // dataSource.setPassword("1");
        return dataSource;

        // return processEngine;
    }

    @Bean
    InitializingBean usersAndGroupsInitializer(final IdentityService identityService) {

        return new InitializingBean() {
            public void afterPropertiesSet() throws Exception {

                if (identityService.createUserQuery().userId("admin").singleResult() == null) {

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
    public CommandLineRunner init(final RepositoryService repositoryService, final RuntimeService runtimeService,
            final TaskService taskService) {

        return new CommandLineRunner() {
            @Override
            public void run(String... strings) throws Exception {
                System.out.println(
                        "Number of process definitions : " + repositoryService.createProcessDefinitionQuery().count());
                System.out.println("Number of tasks : " + taskService.createTaskQuery().count());
                runtimeService.startProcessInstanceByKey("oneTaskProcess");
                System.out.println("Number of tasks after process start: " + taskService.createTaskQuery().count());

            }
        };

    }
}