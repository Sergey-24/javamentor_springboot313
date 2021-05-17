package com.javamentor.springboot.web.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

     @GetMapping()
    public String showUsersForAdmin() {
        return "admin/admin-list";
    }

}
