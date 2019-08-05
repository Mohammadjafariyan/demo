package controllers;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.ProcessDefinition;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.io.InputStream;

@Controller
public class ResourceController {

    @ResponseBody
    @RequestMapping(value = "/getPhoto", method = RequestMethod.GET,
            produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getPhoto(String key) throws Exception {

        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RepositoryService repositoryService = processEngine.getRepositoryService();


        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .processDefinitionKey(key)
                .latestVersion()
                .singleResult();

        if(processDefinition==null)
            throw new Exception("گردش کاری با key داده شده یافت نشد");

        String diagramResourceName = processDefinition.getDiagramResourceName();
        InputStream in = repositoryService.getResourceAsStream(
                processDefinition.getDeploymentId(), diagramResourceName);



        return IOUtils.toByteArray(in);
    }




}


