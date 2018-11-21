package ejb;

import model.User;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.Queue;

@Stateless
public class MessageReceiverSync implements MessageReceiverSyncLocal {
    @Inject
    JMSContext context;

    @Resource(mappedName = "java:/jms/queue/watcherqueue")
    Queue queue;

    @Override
    public User receiveMessage() {
        JMSConsumer consumer = context.createConsumer(queue);
        User user = consumer.receiveBody(User.class);

        return user;
    }
}
