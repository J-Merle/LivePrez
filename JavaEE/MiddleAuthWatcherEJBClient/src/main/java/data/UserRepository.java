package data;

import model.User;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

@ApplicationScoped
public class UserRepository {
    @PersistenceContext
    private EntityManager em;

    public User findByLogin(String login){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> criteria = cb.createQuery(User.class);
        Root<User> user = criteria.from(User.class);

        criteria.select(user).where(cb.equal(user.get("login"), login));

        User result;
        try {
            result = em.createQuery(criteria).getSingleResult();
        } catch (NoResultException e) {
            result = null;
        }
        return result;
    }

    public void saveUser(User user){
        em.persist(user);
    }
}
