package model;

import data.UserRepository;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class DataContainer {
    @Inject
    UserRepository repository;

    public User checkUser(User user) {
        User storedUser = repository.findByLogin(user.getLogin());

        if (storedUser != null && storedUser.getPwd().equals(user.getPwd())) {
            storedUser.setValidAuth(true);
            return storedUser;
        }

        return user;
    }
}
