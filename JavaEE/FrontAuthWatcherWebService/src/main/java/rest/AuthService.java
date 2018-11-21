package rest;

import ejb.MessageSenderLocal;
import ejb.MessageReceiverSyncLocal;
import model.User;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;

@Path("/login")
@RequestScoped
public class AuthService {

    @EJB
    MessageSenderLocal sender;

    @EJB
    MessageReceiverSyncLocal receiver;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response logIn(User user) {

        Response.ResponseBuilder builder;

        sender.sendMessage(user);

        User receivedUser = receiver.receiveMessage();

        HashMap map = new HashMap();
        map.put("login", receivedUser.getLogin());
        map.put("validAuth", receivedUser.isValidAuth());
        map.put("role", receivedUser.getRole());

        if (!receivedUser.isValidAuth()) {
            builder = Response.status(Response.Status.FORBIDDEN).entity(map);
        } else {
            builder = Response.ok(map, MediaType.APPLICATION_JSON);
        }

        return builder.build();
    }
}
