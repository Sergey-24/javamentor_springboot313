package com.javamentor.springboot.web.demo.controller;

import com.javamentor.springboot.web.demo.entity.Role;
import com.javamentor.springboot.web.demo.entity.User;
import com.javamentor.springboot.web.demo.service.RoleService;
import com.javamentor.springboot.web.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@Transactional
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String showUsersForAdmin(Model model) {
        List<User> allUsers = userService.getAllUsers();
        model.addAttribute("users", allUsers);
        return "admin/user-list";
    }

    @GetMapping("/addNewUser")
    public String addNewUser(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        model.addAttribute("roles", roleService.findAllRoles());
        return "admin/user-creat";
    }

    @PostMapping("/addNewUser")
    public String saveUser(@RequestParam List<String> roles, User user) {
        List<Role> roleList = new ArrayList<>();
        for(String a: roles){
            roleList.add(roleService.findRoleById(a));
        }
        user.setRoles(roleList);
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/user-delete/{id}")
    public String deleteUserFrom(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.findUserById(id));
        model.addAttribute("roles", roleService.findAllRoles());
        return "admin/user-delete";
    }

    @PostMapping("/user-delete")
    public String deleteUser(User user) {

        userService.deleteUserById(user.getId());
        return "redirect:/admin";
    }

    @GetMapping("/user-update/{id}")
    public String updateUserForm(@PathVariable("id") Long id, Model model) {
        User user = userService.findUserById(id);
        model.addAttribute("user", user);
        model.addAttribute("roles", roleService.findAllRoles());
        return "admin/user-update";
    }

    @PostMapping("/user-update")
    public String updateUser(@RequestParam List<String> roles, @RequestParam String password
            , User user) {
        List<Role> roleList = new ArrayList<>();
        for(String a: roles){
            roleList.add(roleService.findRoleById(a));
        }
        user.setRoles(roleList);
        userService.updateUser(user, password);
        return "redirect:/admin";
    }
}
