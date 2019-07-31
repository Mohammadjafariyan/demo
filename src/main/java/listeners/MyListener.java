package listeners;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import service.RestfulClient;

import java.io.StringWriter;
import java.util.Map;

public class MyListener implements TaskListener {
    @Override
    public void notify(DelegateTask delegateTask) {

        JSONObject obj = new JSONObject();

        obj.put("Assignee",delegateTask.getAssignee());
   //     obj.put("Candidates",delegateTask.getCandidates());
        obj.put("DelegationState",delegateTask.getDelegationState());
        obj.put("ExecutionId",delegateTask.getExecutionId());
        obj.put("Id",delegateTask.getId());
        obj.put("ProcessDefinitionId",delegateTask.getProcessDefinitionId());
        obj.put("ProcessInstanceId",delegateTask.getProcessInstanceId());
        obj.put("Name",delegateTask.getName());
        obj.put("TaskDefinitionKey",delegateTask.getTaskDefinitionKey());
        obj.put("EventName",delegateTask.getEventName());
        obj.put("Description",delegateTask.getDescription());


        JSONObject[] vars=new JSONObject[delegateTask.getVariables().size()];
        int i=0;
        for(Map.Entry<String, Object> entry : delegateTask.getVariables().entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            JSONObject var=new JSONObject();

            var.put("Name",key);
            var.put("Value",value);
            vars[i++]=var;
        }
        JSONArray arr=new JSONArray(vars);
        obj.put("Variables",arr);

        StringWriter out = new StringWriter();
        obj.write(out);



        RestfulClient.post(out.toString()
                ,"http://localhost:5000/api/EngineListener/Notify");


    }
}
