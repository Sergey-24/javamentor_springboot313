package com.javamentor.springboot.web.demo.service;




import com.javamentor.springboot.web.demo.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> getRoles(String role);

    List<Role> findAllRoles();

    void saveRole(Role role);

    public Role findRoleById(String rolename);
}
