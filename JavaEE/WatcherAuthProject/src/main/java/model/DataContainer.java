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

        if (storedUser == null) {
            System.out.println("Registering : " + user.toString());
            repository.saveUser(user);

            user.setValidAuth(true);

            return user;
        } else {
            if (storedUser.getPwd().equals(user.getPwd())) {
                storedUser.setValidAuth(true);
            }
        }

        return storedUser;
    }
}
