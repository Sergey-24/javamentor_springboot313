package com.javamentor.springboot.web.demo.service;




import com.javamentor.springboot.web.demo.entity.Role;

import java.util.List;

public interface RoleService {

    List<Role> findAllRoles();

    void saveRole(Role role);

    public Role findRoleByName(String rolename);

    List<Role> findRole(List<String> roles);
}
