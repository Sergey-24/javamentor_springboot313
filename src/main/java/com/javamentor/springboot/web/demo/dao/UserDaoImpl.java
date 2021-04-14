package com.javamentor.springboot.web.demo.dao;

import com.javamentor.springboot.web.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    EntityManager entityManager;

    private RoleDao roleDao;

    @Autowired
    public void setRoleDao(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public List<User> getAllUsers() {
        return entityManager.createQuery("SELECT DISTINCT u FROM User u JOIN FETCH u.roles")
                .getResultList();
    }

    @Override
    public void saveUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void deleteUserById(Long id) {
        User user = entityManager.find(User.class, id);
        entityManager.remove(user);
    }

    @Override
    public User findUserById(Long id) {
        return entityManager
                .createQuery("SELECT u FROM User u JOIN FETCH u.roles WHERE u.id = :id", User.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    @Override
    public void updateUser(User user) {
        entityManager.merge(user);
    }

    @Override
    public User findUserByUsername(String name) {
        return entityManager
                .createQuery("SELECT u FROM User u JOIN FETCH u.roles WHERE u.firstName = :name", User.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    public String findPassword(User user) {
        Query query = entityManager
                .createQuery("SELECT u.password FROM User u WHERE u.firstName = :name")
                .setParameter("name", user.getFirstName());

        return (String) query.getSingleResult();
    }
}
