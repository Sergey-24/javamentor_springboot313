package com.javamentor.springboot.web.demo.dao;



import com.javamentor.springboot.web.demo.entity.Role;

import java.util.List;

public interface RoleDao {
    List<Role> findAllRoles();

    void saveRole(Role role);

    Role findRoleByName(String roleName);
}
