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
    public List<Role> getRoles(String role) {
        return entityManager.createQuery("select r from Role r WHERE r.role = :role", Role.class)
                .setParameter("role", role)
                .getResultList();
    }

    @Override
    public List<Role> findAllRoles() {
        return entityManager.createQuery("select distinct r from Role r join fetch r.users")
                .getResultList();
    }

    @Override
    public void saveRole(Role role) {
        entityManager.persist(role);
    }

    @Override
    public Role findRoleByName(String roleName) {
        return entityManager
                .createQuery("select r from Role r join fetch r.users where r.role = :rolename", Role.class)
                .setParameter("rolename", roleName)
                .getSingleResult();
    }
}
