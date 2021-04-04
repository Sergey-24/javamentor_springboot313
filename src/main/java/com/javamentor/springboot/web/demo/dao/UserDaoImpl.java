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
        return entityManager.createQuery("select distinct u from User u join fetch u.roles")
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
                .createQuery("select u from User u join fetch u.roles where u.id = :id", User.class)
                .setParameter("id", id)
                .getSingleResult();
//                entityManager.find(User.class, id);
    }

    @Override
    public void updateUser(User user) {
        entityManager.merge(user);
    }

    @Override
    public User findUserByUsername(String name) {
        return entityManager
                .createQuery("select u from User u join fetch u.roles where u.firstName = :name", User.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    public String findPassword(User user) {
        Query query = entityManager
                .createQuery("select u.password from User u where u.firstName = :name")
                .setParameter("name", user.getFirstName());
        System.out.println((String) query.getSingleResult());

        return (String)query.getSingleResult();
    }
}
