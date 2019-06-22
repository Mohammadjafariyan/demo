package controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {



    @GetMapping("/")
    public String Index(){

      //  return "templates/sp/index";
        return "forward:/index.html";
    }
}
