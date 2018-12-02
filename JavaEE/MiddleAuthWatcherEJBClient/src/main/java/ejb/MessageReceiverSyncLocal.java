package ejb;

import model.User;

import javax.ejb.Local;

@Local
public interface MessageReceiverSyncLocal {
    User receiveMessage();
}
