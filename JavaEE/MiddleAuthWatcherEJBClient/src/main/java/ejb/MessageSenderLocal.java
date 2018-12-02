package ejb;

import model.User;

import javax.ejb.Local;

@Local
public interface MessageSenderLocal {
    void sengMessage(String message);

    void sendMessage(User user);
}
