package com.javamentor.springboot.web.demo.dao;



import com.javamentor.springboot.web.demo.entity.User;

import java.util.List;

public interface UserDao {
    List<User> getAllUsers();

    void saveUser(User user);

    void deleteUserById(Long id);

    User findUserById(Long id);

    void updateUser(User user);

    User findUserByUsername(String name);

    String findPassword(User user);
}
