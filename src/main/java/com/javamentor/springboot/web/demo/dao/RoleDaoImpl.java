package com.javamentor.springboot.web.demo.dao;

import com.javamentor.springboot.web.demo.entity.Role;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


@Repository
public class RoleDaoImpl implements RoleDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Role> findAllRoles() {
        return entityManager.createQuery("FROM Role", Role.class)
                .getResultList();
    }

    @Override
    public void saveRole(Role role) {
        entityManager.persist(role);
    }

    @Override
    public Role findRoleByName(String roleName) {
        return entityManager
                .createQuery("SELECT r FROM Role r  WHERE r.role = :rolename", Role.class)
                .setParameter("rolename", roleName)
                .getSingleResult();
    }
}
