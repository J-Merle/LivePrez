package ejb;

import model.Role;
import model.User;
import model.DataContainer;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.*;
import java.util.Date;

@MessageDriven(
    activationConfig = {
        @ActivationConfigProperty(
            propertyName = "destinationType",
            propertyValue = "javax.jms.Topic"),
        @ActivationConfigProperty(
            propertyName = "destination",
            propertyValue = "java:/jms/watcherAuthJMS")
    })
public class AuthWatcherMsgDrivenEJB implements MessageListener {

    @EJB
    MessageSenderQueueLocal sender;

    @EJB
    private DataContainer dataContainer;

    public void onMessage(Message message) {
        try {
            if (message instanceof TextMessage) {
                System.out.println("Topic: I received a TextMessage at "+ new Date());
                TextMessage msg = (TextMessage) message;
                System.out.println("Message is : " + msg.getText());
            } else if (message instanceof ObjectMessage) {
                System.out.println("Topic: I received an ObjectMessage at "+ new Date());
                ObjectMessage msg = (ObjectMessage) message;

                if( msg.getObject() instanceof User){
                    User user = (User) msg.getObject();

                    System.out.println("User Details: ");
                    System.out.println("login: "+user.getLogin());
                    System.out.println("pwd: "+user.getPwd());

                    User authenticatedUser = dataContainer.checkUser(user);

                    sender.sendMessage(authenticatedUser);
                }
            } else {
                System.out.println("Not valid message for this Queue MDB");
            }
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}